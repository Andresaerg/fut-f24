import { Player } from "./player.model";

export interface Team {
    name: string;
    onField: Player[];
    onBench: Player[];
    substitutions: number;
    goalkeeper: Player | null;
}
