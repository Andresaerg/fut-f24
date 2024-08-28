import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Player } from '../models/player.model';
import { MatchService } from './match.service';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private match?: Match;

  constructor(private matchService: MatchService) { 
    this.matchService.match$.subscribe(match => {
      this.match = match;
    })
  }

  changeGoalkeeper(team: Team, player: Player): void {

    const gkIndex = team.onField.findIndex(p => p.id === team.goalkeeper!.id);
    
    if(!team.onField.includes(player)){
      const pIndex = team.onBench.findIndex(p => p.id === player.id);
      if (gkIndex !== -1) {
        team.onField[gkIndex] = player;
        team.onBench[pIndex] = team.goalkeeper!;
        player.hasPlayed = true;
      }
    }else{
      const pIndex = team.onField.findIndex(p => p.id === player.id);
      if (gkIndex !== -1) {
        team.onField[gkIndex] = player;
        team.onField[pIndex] = team.goalkeeper!;
        player.hasPlayed = true;
      }
    }

    team.goalkeeper = player;
  }

  makeSubstitution(team: Team, playerOut: Player, playerIn: Player): string{
    if (team.substitutions >= 3) {
      return 'No se pueden realizar más cambios.';
    }

    if (!this.match?.isSecondHalf) {
      return 'Los cambios solo se pueden realizar en el segundo tiempo.';
    }

    if (playerIn.hasPlayed) {
      return 'El jugador ya estuvo en el campo.';
    }

    const fieldIndex = team.onField.findIndex(p => p.id === playerOut.id);
    const benchIndex = team.onBench.findIndex(p => p.id === playerIn.id);
    if (fieldIndex !== -1) {
      team.onField[fieldIndex] = playerIn;
      team.onBench[benchIndex] = playerOut;
      playerIn.hasPlayed = true;
      team.substitutions++;
      return 'Cambio realizado.';
    }

    return 'El jugador no está en el campo.';
  }
}
