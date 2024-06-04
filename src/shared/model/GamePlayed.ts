export class GamePlayed {

    constructor(public categoryId : number, 
                public gameId : number, 
                public playedDate : Date, 
                public gamePoints : number,
                public secondsLeftInGame : number, 
                public secondsPlayed : number) {
    }

}