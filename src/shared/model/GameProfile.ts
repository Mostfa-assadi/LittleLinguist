import { GameDifficulty } from "./GameDifficulty";

export class GameProfile {

    constructor(public id : number, 
                public name : string, 
                public description : string, 
                public difficulty : GameDifficulty,
                public gameURL : string) {
    }
}