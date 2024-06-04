import { QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { Category } from "../../../shared/model/category";
import { languageConverter } from "./languages-converter";
import { GamePlayed } from "../../../shared/model/GamePlayed";

export const gamesPlayedConverter = {
    
    toFirestore: (gamePlayed : GamePlayed) => {
        return {
            categoryId : gamePlayed.categoryId,
            gameId : gamePlayed.gameId,
            playedDate : gamePlayed.playedDate,
            gamePoints: gamePlayed.gamePoints,
            secondsLeftInGame: gamePlayed.secondsLeftInGame,
            secondsPlayed: gamePlayed.secondsPlayed
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) : GamePlayed=> {
        const data = snapshot.data(options);
        return new GamePlayed(data['categoryId'], 
        data['gameId'], 
        data['playedDate'], 
        data['gamePoints'], 
        data['secondsLeftInGame'], 
        data['secondsPlayed'])
    },

   };