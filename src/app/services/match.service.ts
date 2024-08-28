import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MOCK_TEAMS } from '../models/mockup/team.mockup';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})

export class MatchService {
  private match: Match;
  private matchSubject: BehaviorSubject<Match>;
  match$;

  private interval: any;

  constructor() {
    this.match = this.createMatch();

    this.matchSubject = new BehaviorSubject<Match>(this.match);
    this.match$ = this.matchSubject.asObservable();
  }

  createMatch(): Match {
    return this.match = {
      teamA: this.cloneTeam(MOCK_TEAMS[0]),
      teamB: this.cloneTeam(MOCK_TEAMS[1]),
      started: false,
      ended: false,
      isSecondHalf: false,
      timer: 0,
      score: {
        teamA: 0,
        teamB: 0
      }
    };
  }

  startMatch(): void {
    this.match.started = true;
    this.match.timer = 0;
    this.match.isSecondHalf = false;
    this.updateMatch();
    this.intervalTimer();
  }

  pauseMatch(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  resumeMatch(): void {
    this.intervalTimer();
  }

  startSecondHalf(): void {
    this.match.isSecondHalf = true;
    this.updateMatch();
    this.resumeMatch();
  }

  endMatch(): void {
    clearInterval(this.interval);
    this.match.ended = true;
    this.updateMatch();
  }

  intervalTimer(): void {
    this.interval = setInterval(() => {
      this.match.timer += 1; // Incrementa el tiempo en 1 segundo
      this.updateMatch();

      if (this.match.timer === 10 && !this.match.isSecondHalf) {
        this.pauseMatch();
      }

      if (this.match.timer === 20 && this.match.isSecondHalf) {
        this.endMatch();
      }

      this.checkForGoals();
    }, 1000);
  }

  updateMatch(): void {
    this.matchSubject.next({ ...this.match });
  }

  getMatch(): Match {
    return this.match;
  }

  updateScore(team: 'A' | 'B', points: number): void {
    if (team === 'A') {
      this.match.score.teamA += points;
    } else {
      this.match.score.teamB += points;
    }
    this.updateMatch();
  }

  resetMatch(): void {
    this.createMatch();
    this.updateMatch();
  }

  checkForGoals(): void {
    const teamAProbability = 0.23; // 23% de probabilidad
    const teamBProbability = 0.21; // 21% de probabilidad
    const combinedProbability = teamAProbability + teamBProbability;

    const randomValue = Math.random();

    if (randomValue <= teamAProbability) {
      this.updateScore('A', 1);
    } else if (randomValue <= combinedProbability) {
      this.updateScore('B', 1);
    }

    this.updateMatch();
  }

  private cloneTeam(team: Team): Team {
    return JSON.parse(JSON.stringify(team));
  }
}