import { Injectable, OnInit } from '@angular/core';
import { GamePlayed } from '../../shared/model/GamePlayed';

@Injectable({
  providedIn: 'root'
})
export class GamesPointsService {
  private readonly GAMESPLAYED_KEY = 'gamesPlayed';
  constructor(){
    const gamesPlayedString = localStorage.getItem(this.GAMESPLAYED_KEY);
    if (gamesPlayedString === null) this.gamesPlayed = [];
    else{
      this.gamesPlayed =  JSON.parse(gamesPlayedString);
    }

  }
  gamesPlayed : GamePlayed[] = [];

  public list() : GamePlayed[]{
    return this.gamesPlayed;
  }


  public addGamePlayed(gamePlayedToAdd : GamePlayed) : void {
    this.gamesPlayed.push(gamePlayedToAdd);
    const gamesPlayed = this.getGamesPlayed();
    gamesPlayed.push(gamePlayedToAdd);
    localStorage.setItem(this.GAMESPLAYED_KEY, JSON.stringify(gamesPlayed));
  }

  private getGamesPlayed() : GamePlayed[]{
    let gamesPlayedString = localStorage.getItem(this.GAMESPLAYED_KEY);

    if (!gamesPlayedString) {
      return [];
    } else {
      return JSON.parse(gamesPlayedString);
    }
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
    const  categoriesLearned : Set<Number> = new Set<Number>();
    gamesPlayed.forEach((gamePlayed : GamePlayed) => {
      if (!categoriesLearned.has(gamePlayed.categoryId)){
        categoriesLearned.add(gamePlayed.categoryId);
      }
    })
    return categoriesLearned.size;
  }

}
