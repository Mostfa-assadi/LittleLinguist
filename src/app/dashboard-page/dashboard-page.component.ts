import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GamesPointsService } from '../services/games-points.service';
import { GamePlayed } from '../../shared/model/GamePlayed';
import { GameProfile } from '../../shared/model/GameProfile';
import { min } from 'rxjs';
import { GamesService } from '../services/games.service';
import { categories } from '../../shared/data/categories';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit{
  gamesPlayedNumber : number = 0;
  totalPoints : number = 0;
  categoriesLearnedNumber : number = 0;
  categoriesLeftNumber : number = 0;
  fullMarksPercentage: string = "";
  gameWithLowestAverage : string = "";
  gameWithHighestAverage : string = "";
  averageGameDuration: string = "";
  hoursPlayed: string = "";
  completedGamesPercentage: string = "";

  constructor(private gamesPointsService : GamesPointsService, 
              private categoriesService : CategoriesService,
              private gamesService : GamesService) {}
  
  ngOnInit(): void {
    this.gamesPointsService.list().then((gamesPlayed) => {
      this.gamesPlayedNumber = gamesPlayed.length;
      
      let secondsPlayed = 0;
      let completedGamesNumber = 0;
      gamesPlayed.forEach((gamePlayed : GamePlayed) => {
                                                        this.totalPoints += gamePlayed.gamePoints;
                                                        secondsPlayed += gamePlayed.secondsPlayed;
                                                        if (gamePlayed.secondsLeftInGame > 0) completedGamesNumber += 1;
                                                      });
      this.hoursPlayed = String((secondsPlayed / (60 * 60)).toFixed(2));
      if (gamesPlayed.length > 0){
        this.completedGamesPercentage = String((completedGamesNumber / gamesPlayed.length).toFixed(2))+ '%';
        this.averageGameDuration = String(((secondsPlayed/60)/gamesPlayed.length).toFixed(2));
      }else{
        this.completedGamesPercentage = '~';
        this.averageGameDuration =  '~';
      }
      this.categoriesLearnedNumber = this.gamesPointsService.getCategoriesLearnedNumber(gamesPlayed);
      this.categoriesService.list().then((categories) => {

        this.categoriesLeftNumber = categories.length - this.categoriesLearnedNumber;
        this.fullMarksPercentage = this.getFullMarkGamesPercentage(gamesPlayed);
        this.gameWithLowestAverage = this.gamesService.getGameName(this.gamesPointsService.getLowestAverageGame(gamesPlayed));
        this.gameWithHighestAverage = this.gamesService.getGameName(this.gamesPointsService.getHighestAverageGame(gamesPlayed));
        
      })
    });
  }


  getFullMarkGamesPercentage(gamesPlayed : GamePlayed[]): string{
    if (gamesPlayed.length === 0) return "~";

    let fullMarkCount = 0;
    gamesPlayed.forEach((gamePlayed : GamePlayed) => {
      if(gamePlayed.gamePoints === 100) fullMarkCount++;
    });

    return Math.floor(fullMarkCount / gamesPlayed.length * 100) + "%";
  }
}
