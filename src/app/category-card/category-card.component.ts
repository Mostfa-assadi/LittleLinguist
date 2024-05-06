import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../shared/model/category';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
 
@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input()
  currentCategory! : Category;

  constructor(private dialogService : MatDialog){}
  chooseGame() : void{
    let dialogRef = this.dialogService.open(ChooseGameDialogComponent, {data: this.currentCategory.id});
   };

  wasUpdatedLastWeek(): boolean{
    
    const lastUpdatedDate = new Date(this.currentCategory.lastUpdateDate);
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    return lastUpdatedDate.getTime() > oneWeekAgo.getTime();
  };



}


