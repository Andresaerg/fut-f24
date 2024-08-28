import { Team } from "./team.model";

export interface Match {
    teamA: Team;
    teamB: Team;
    started: boolean;
    ended: boolean;
    isSecondHalf: boolean;
    timer: number;
    score: {
        teamA: number;
        teamB: number;
    }
}
