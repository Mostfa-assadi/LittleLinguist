import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../../../../shared/model/translated-word';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../../shared/model/category';
import { GamesPointsService } from '../../../services/games-points.service';
import { GamePlayed } from '../../../../shared/model/GamePlayed';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuitGameDialogComponent } from '../../../quit-game-dialog/quit-game-dialog.component';
import { QuitGameComponent } from '../../../quit-game/quit-game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResultDialogComponent } from '../../../result-dialog/result-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-word-sorter-game',
    standalone: true,
    templateUrl: './word-sorter-game.component.html',
    styleUrl: './word-sorter-game.component.css',
    imports: [MatFormFieldModule, MatInputModule, 
              MatSelectModule, CommonModule,
              MatProgressBarModule, QuitGameComponent, 
              MatInputModule, MatIconModule]
})
export class WordSorterGameComponent implements OnInit {
[x: string]: any;
  @Input()
  categoryId!: string;

  selectedCategory!: Category;
  randomCategory!: Category;
  step : number = 0;
  inOrderedWords : TranslatedWord [] = [];
  results: Map<TranslatedWord, boolean> = new Map<TranslatedWord, boolean>();
  correctAnswers : number = 0;

  points : number = 0;
  constructor (private categoriesService : CategoriesService, 
              private gamesPointsService : GamesPointsService, 
              private dialogService : MatDialog, 
              private router: Router){}
  
  ngOnInit(): void {
    const categories = this.categoriesService.list().sort(() => 0.5 - Math.random());
    const selectedCategory = this.categoriesService.get(parseInt(this.categoryId));
    if (selectedCategory !== undefined){
      this.selectedCategory = selectedCategory;
      this.inOrderedWords = this.inOrderedWords.concat(this.generateWords(selectedCategory, 3));

    }else{
      alert('Category was not found!');
    }

    for(let i = 0; i < categories.length; i++){
      if (categories[i].id !== parseInt(this.categoryId)){
        this.randomCategory = categories[i];
        this.inOrderedWords = this.inOrderedWords.concat(this.generateWords(this.randomCategory, 3));
        break;
      }
    }

    this.inOrderedWords = this.inOrderedWords.sort(() => 0.5 - Math.random());
    
  }
  

  generateWords (category : Category, wordsNumber : number) : TranslatedWord[]{
    const shuffeled = category.words.sort(() => 0.5 - Math.random());
    let res = shuffeled.slice(0, wordsNumber);
    return res;
  }

  playGame() {
    let gamePoints = 0;
    let gamePlayed : GamePlayed = new GamePlayed(parseInt(this.categoryId), 0, new Date(), gamePoints)
    this.gamesPointsService.addGamePlayed(gamePlayed);
  }

  confirm_quit() {
    let dialogRef = this.dialogService.open(QuitGameDialogComponent, {data: name});
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const navigationDetails: string[] = ['/choose-category'];
        this.router.navigate(navigationDetails);
      }});
  }


  

  check_answer(answer : boolean){
    const result = this.selectedCategory.words.find((word) => word === this.inOrderedWords[this.step]);
    if (answer){
      this.inOrderedWords[this.step].guess = "YES";
    }else{
      this.inOrderedWords[this.step].guess = "NO";
    }
    if ((result !== undefined) == answer){
      this.results.set(this.inOrderedWords[this.step], true);
      this.correctAnswers++;
      let dialogRef = this.dialogService.open(
        ResultDialogComponent, 
        {data: {resultMessage : "Great Job!", buttonContent: "CONTINUE"}});
    }else{
      this.results.set(this.inOrderedWords[this.step], false);
      let dialogRef = this.dialogService.open(
      ResultDialogComponent, 
      {data: {resultMessage : "Incorrect, Give it another try", buttonContent: "GOT IT"}});
    }

    this.step++;
    this.points = Math.floor((this.correctAnswers) * (100 / this.inOrderedWords.length));

    if (this.step === this.inOrderedWords.length){
      this.gamesPointsService.addGamePlayed(new GamePlayed(this.selectedCategory.id, 4, new Date(), this.points));

      const navigationDetails: any[] = ['/word-sorter-game-results', JSON.stringify({results : Array.from(this.results.entries()), 
                                                  correctAnswers : this.correctAnswers, 
                                                  totalAnswers: this.inOrderedWords.length, 
                                                  selectedCategoryName : this.selectedCategory.name,
                                                  randomCategoryName: this.randomCategory.name})];
      this.router.navigate(navigationDetails);
    }


  }


  


}
