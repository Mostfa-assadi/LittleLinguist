export class GamePlayed {

    constructor(public categoryId : string, 
                public gameId : number, 
                public playedDate : Date, 
                public gamePoints : number,
                public secondsLeftInGame : number, 
                public secondsPlayed : number) {
    }

}