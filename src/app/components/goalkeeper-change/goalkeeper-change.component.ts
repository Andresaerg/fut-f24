import { Component, inject, output } from '@angular/core';
import { Team } from '../../models/team.model';
import { NgFor, NgIf } from '@angular/common';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-goalkeeper-change',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './goalkeeper-change.component.html',
  styleUrl: './goalkeeper-change.component.css'
})
export class GoalkeeperChangeComponent {
  nzData: { team: Team } = inject(NZ_MODAL_DATA);
  goalkeeperChange = output<Player>();

  constructor(private modalRef: NzModalRef<string>) {}

  changeGoalkeeper(player: Player): void {
    this.goalkeeperChange.emit(player);
    this.modalRef.close();
  }

  close(): void {
    this.modalRef.close(this.nzData);
  }
}
