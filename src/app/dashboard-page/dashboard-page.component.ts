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

  constructor(private gamesPointsService : GamesPointsService, 
              private categoriesService : CategoriesService,
              private gamesService : GamesService) {}
  
  ngOnInit(): void {
    const gamesPlayed = this.gamesPointsService.list();
    this.gamesPlayedNumber = gamesPlayed.length;

    gamesPlayed.forEach((gamePlayed : GamePlayed) => this.totalPoints += gamePlayed.gamePoints);
    this.categoriesLearnedNumber = this.gamesPointsService.getCategoriesLearnedNumber(gamesPlayed);
    this.categoriesLeftNumber = this.categoriesService.list().length - this.categoriesLearnedNumber;
    this.fullMarksPercentage = this.getFullMarkGamesPercentage(gamesPlayed);
    this.gameWithLowestAverage = this.gamesService.getGameName(this.gamesPointsService.getLowestAverageGame(gamesPlayed));
    this.gameWithHighestAverage = this.gamesService.getGameName(this.gamesPointsService.getHighestAverageGame(gamesPlayed));
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
