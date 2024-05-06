import { Injectable, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/GameProfile';
import { GameDifficulty } from '../../shared/model/GameDifficulty';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games : GameProfile[] = [];

  constructor() {
    this.games.push(new GameProfile(1, "Matching Game", "You have to match each word with its meaning.",  GameDifficulty.MEDIUM, "matching-game"));
    this.games.push(new GameProfile(4, "Word Sorter Game", "You have to sort the English word if it is in the chosen category or not.", GameDifficulty.EASY, "word-sorter-game"));
    this.games.push(new GameProfile(3, "Mixed Letters Game", "You have to resort the english word's letters and enter it.", GameDifficulty.MEDIUM, "mixed-letters-game"));

  }

  getGameName(gameId : number) : string {
    let gameName = "~";
    this.games.forEach((game : GameProfile) => {
      if (game.id === gameId) gameName = game.name;
    })
    return gameName;
  }
  getGames() : GameProfile[] {
    return this.games;
  }
}
