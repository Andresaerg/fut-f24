import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Match } from './models/match.model';
import { TeamComponent } from './components/team/team.component';
import { MatchService } from './services/match.service';
import { NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamComponent, NgIf, NzButtonModule, NzModalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'fut-f24';

  match?: Match;
  teamA = 0;
  teamB = 0;
  matchResults: boolean = false;

  constructor(private matchService: MatchService, private modal: NzModalService) {}

  startMatch(): void {
    this.matchService.startMatch();
  }

  startSecondHalf(): void {
    this.matchService.startSecondHalf();
  }

  endMatch(): void {
    this.matchService.endMatch();
  }
  
  resetMatch(): void {
    this.matchService.resetMatch();
    this.teamA = 0;
    this.teamB = 0;
    this.matchResults = false;
  }

  launchConfetti(team: 'A' | 'B'): void {
    const colors = team === 'B' ? ['#ff0000', '#ffffff'] : ['#0000ff', '#ffffff'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });
  }

  showResults(): void {
    if (!this.matchResults) return; // Solo mostrar resultados si el partido ha terminado

    let resultMessage = '';
    let colors: string[] = [];

    if (this.teamA > this.teamB) {
      resultMessage = `¡El equipo ${this.match?.teamA.name} ganó!`;
      colors = ['#0000ff', '#ffffff']; // Colores del equipo A
    } else if (this.teamB > this.teamA) {
      resultMessage = `¡El equipo B ${this.match?.teamB.name} ganó!`;
      colors = ['#ff0000', '#ffffff']; // Colores del equipo B
    } else {
      resultMessage = '¡Es un empate!';
      colors = ['#00ff00', '#ffffff']; // Colores para empate 🤷‍♂️
    }

    // Mostrar el mensaje del resultado
    this.modal.closeAll();
    this.modal.info({
      nzTitle: resultMessage,
    })

    // Lanzar confetti con los colores correspondientes
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: 0.1, y: Math.random() - 0.2 }, colors: colors });
      confetti({ ...defaults, particleCount, origin: { x: 0.7, y: Math.random() - 0.2 }, colors: colors });
    }, 250);
  }

  ngOnInit(): void {
    this.matchService.match$.subscribe(match => {
      if (this.match?.started) {
        if (match.score.teamA > this.teamA) {
          this.teamA++
          this.launchConfetti('A');
          this.modal.closeAll();
          this.modal.success({
            nzTitle: `¡Gol del equipo ${this.match.teamA.name}!`
          })
        }
        if (match.score.teamB > this.teamB) {
          this.teamB++
          this.launchConfetti('B');
          this.modal.closeAll();
          this.modal.success({
            nzTitle: `¡Gol del equipo ${this.match.teamB.name}!`
          })
        }
      }

      if(this.match?.ended && !this.matchResults){
        this.matchResults = true;
        this.showResults();
      }
      this.match = match;
    });
  }

  ngOnDestroy(): void {
    this.matchService.endMatch();
  }
}
