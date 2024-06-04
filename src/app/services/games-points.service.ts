import { Injectable, OnInit } from '@angular/core';
import { GamePlayed } from '../../shared/model/GamePlayed';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, Firestore, addDoc, collection, QuerySnapshot, getDocs, DocumentSnapshot } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { gamesPlayedConverter } from './converters/gamesPlayed-converter';

@Injectable({
  providedIn: 'root'
})
export class GamesPointsService {

  // private readonly GAMESPLAYED_KEY = 'gamesPlayed';
  constructor(private firestoreService : Firestore){}

  async list(): Promise<GamePlayed[]> {
    const collectionConnection = collection(this.firestoreService, 'gamesPlayed').withConverter(gamesPlayedConverter);

    const querySnapshot: QuerySnapshot<GamePlayed> = await getDocs(collectionConnection);

    const result: GamePlayed[] = [];

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<GamePlayed>) => {
      const data = docSnap.data();
      if(data){
        result.push(data);
      }
    });
    return result;
  }


  async addGamePlayed(gamePlayedToAdd : GamePlayed){
    await addDoc(collection(this.firestoreService, 'gamesPlayed').withConverter(gamesPlayedConverter), gamePlayedToAdd);
  }



  getLowestAverageGame(gamesPlayed : GamePlayed[]) : number{
    const gameVsGrades : Map<number, number[]> = new Map<number, number[]>();
    gamesPlayed.forEach((gamePlayed : GamePlayed) => {
      if (gameVsGrades.has(gamePlayed.gameId)){
        gameVsGrades.get(gamePlayed.gameId)?.push(gamePlayed.gamePoints); // review
      }else{
        gameVsGrades.set(gamePlayed.gameId, [gamePlayed.gamePoints]); // review
      }
    });

    const gameVsAverage : Map<number, number> = new Map<number, number>();

    let lowestAverage : number = 101;
    gameVsGrades.forEach((value : number[], key : number) => {
        const avg = value.reduce((sum:number, grade:number) => sum += grade, 0) / value.length;
        gameVsAverage.set(key, avg);
    });

    let gameId = -1;
    gameVsAverage.forEach((value : number, key: number) => {
      if(value < lowestAverage){
        lowestAverage = value;     
        gameId = key;
      }
      
    })

    return gameId;
  }
  getHighestAverageGame(gamesPlayed : GamePlayed[]) : number{
    const gameVsGrades : Map<number, number[]> = new Map<number, number[]>();
    gamesPlayed.forEach((gamePlayed : GamePlayed) => {
      if (gameVsGrades.has(gamePlayed.gameId)){
        gameVsGrades.get(gamePlayed.gameId)?.push(gamePlayed.gamePoints); // review
      }else{
        gameVsGrades.set(gamePlayed.gameId, [gamePlayed.gamePoints]); // review
      }
    });

    const gameVsAverage : Map<number, number> = new Map<number, number>();

    let HighestAverage : number = 0;
    gameVsGrades.forEach((value : number[], key : number) => {
        const avg = value.reduce((sum:number, grade:number) => sum += grade, 0) / value.length;
        gameVsAverage.set(key, avg);
    });

    let gameId = -1;
    gameVsAverage.forEach((value : number, key: number) => {
      if(value > HighestAverage){
        HighestAverage = value;     
        gameId = key;
      }
      
    })

    return gameId;
  }


  getCategoriesLearnedNumber(gamesPlayed : GamePlayed[]) : number{
    const  categoriesLearned : Set<string> = new Set<string>();
    gamesPlayed.forEach((gamePlayed : GamePlayed) => {
      if (!categoriesLearned.has(gamePlayed.categoryId)){
        categoriesLearned.add(gamePlayed.categoryId);
      }
    })
    return categoriesLearned.size;
  }

}
