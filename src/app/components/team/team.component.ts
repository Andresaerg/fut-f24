import { Component, inject, input, OnInit, ViewContainerRef } from '@angular/core';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';
import { TeamService } from '../../services/team.service';
import { NgFor, NgIf } from '@angular/common';
import { MatchService } from '../../services/match.service';
import { Match } from '../../models/match.model';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { PruebaComponent } from '../prueba/prueba.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { GoalkeeperChangeComponent } from '../goalkeeper-change/goalkeeper-change.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgFor, NgIf, NzButtonModule, NzDrawerModule, NzFormControlComponent, NzFlexModule, GoalkeeperChangeComponent, NzModalModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit{

  private drawerService = inject(NzDrawerService);
  private modalService = inject(NzModalService);
  private viewContainerRef = inject(ViewContainerRef);

  showDrawer(team: Team): void {
    const placement = team.name === 'Manchester City' ? 'left' : 'right';

    this.drawerService.create({
      nzTitle: team.name,
      nzContent: PruebaComponent,
      nzClosable: true,
      nzData: {team},
      nzPlacement: placement,
    })
  }

  createComponentModal(team: Team): void {
    const modal = this.modalService.create<GoalkeeperChangeComponent>({
      nzContent: GoalkeeperChangeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: { team },
      nzFooter: null,
      nzCentered: true,
    });

    modal.componentInstance?.goalkeeperChange.subscribe((player: Player) => {
      this.changeGoalkeeper(player);
    });
  }

  team = input.required<Team>();
  match?: Match;
  showPlayerList: boolean = false;
  showInFieldList: boolean = false;
  showBenchList: boolean = false;
  goalkeeperSelected: boolean = false;
  allowChanges: boolean = false;
  selectedPlayerOut?: Player | null;
  selectedPlayerIn?: Player | null;
  drawerVisible: boolean = false;

  constructor(private teamService: TeamService, private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService.match$.subscribe(match => {
      this.match = match;

      if(this.match.started){
        this.goalkeeperSelected = true;
      }

      if (this.match.isSecondHalf) {
        this.allowChanges = true;
      }

      if (this.match.ended){
        this.allowChanges = false;
      }

      if(!this.match.ended && !this.match.started){
        this.goalkeeperSelected = false;
      }
    });
  }

  startChange(): void {
    this.showInFieldList = true;
    this.matchService.pauseMatch();
  }

  selectPlayerOut(player: Player): void {
    this.selectedPlayerOut = player;
    this.showInFieldList = false;
    this.showBenchList = true;
  }

  selectPlayerIn(player: Player): void {
    this.selectedPlayerIn = player;
    this.showBenchList = false;
    this.makeSubstitution();
  }

  makeSubstitution(): void {
    if (this.selectedPlayerOut && this.selectedPlayerIn) {
      alert(this.teamService.makeSubstitution(this.team(), this.selectedPlayerOut, this.selectedPlayerIn));
      this.selectedPlayerOut = null;
      this.selectedPlayerIn = null;

      this.matchService.resumeMatch();
    }
  }

  togglePlayerList(): void {
    this.showPlayerList = !this.showPlayerList;
  }

  changeGoalkeeper(player: Player): void {
    this.teamService.changeGoalkeeper(this.team(), player);
    this.showPlayerList = false;
    this.goalkeeperSelected = true;
  }
}
