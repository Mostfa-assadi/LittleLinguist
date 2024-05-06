import { ChangeDetectionStrategy, Component, Inject, Input, NgModule, OnInit } from '@angular/core';
import { GameDifficulty } from '../../shared/model/GameDifficulty';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { GameProfile } from '../../shared/model/GameProfile';
import { GamesService } from '../services/games.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-choose-game-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterModule, MatDialogModule, MatInputModule],
  templateUrl: './choose-game-dialog.component.html',
  styleUrl: './choose-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ChooseGameDialogComponent implements OnInit {
  
  allGames : GameProfile[] = [];
  selectedGame? : GameProfile;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedCategoryId : string, 
              private gamesService : GamesService){}
    
  
  ngOnInit(): void {
    this.allGames = this.gamesService.getGames();
  }

      
 
    
}
