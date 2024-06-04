import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../../../../shared/model/translated-word';
import { Category } from '../../../../shared/model/category';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { GamesPointsService } from '../../../services/games-points.service';
import { ResultDialogComponent } from '../../../result-dialog/result-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuitGameComponent } from '../../../quit-game/quit-game.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamePlayed } from '../../../../shared/model/GamePlayed';
import { MatIconModule } from '@angular/material/icon';
import { GameDifficulty } from '../../../../shared/model/GameDifficulty';
import { TimerComponent } from "../../../timer/timer.component";

@Component({
    selector: 'app-mixed-letters-game',
    standalone: true,
    templateUrl: './mixed-letters-game.component.html',
    styleUrl: './mixed-letters-game.component.css',
    imports: [CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatProgressBarModule,
        QuitGameComponent,
        MatInputModule,
        MatIconModule, TimerComponent]
})
export class MixedLettersGameComponent implements OnInit {  @Input()
  categoryId!: string;
  selectedCategory!: Category;
  step : number = 0;
  categoryWords : TranslatedWord [] = [];
  mixedLettersWords : Map<string, string> = new Map<string, string>();
  answer!: string;
  results: Map<TranslatedWord, boolean> = new Map<TranslatedWord, boolean>();
  correctAnswers : number = 0;
  points : number = 0;
  difficulty: GameDifficulty = GameDifficulty.HARD
  gameTime: string = "3";
  constructor (private categoriesService : CategoriesService, 
    private gamesPointsService : GamesPointsService, 
    private dialogService : MatDialog, 
    private router: Router){}

    ngOnInit(): void {
      
      const selectedCategory = this.categoriesService.get(parseInt(this.categoryId));
      if (selectedCategory !== undefined){
        this.selectedCategory = selectedCategory;
        this.categoryWords = this.categoryWords.concat(this.selectedCategory.words.sort(() => 0.5 - Math.random()));
        
        this.categoryWords.forEach((word : TranslatedWord) => {
          const mixedLettersWord = this.getMixedWord(word.origin);
          this.mixedLettersWords.set(word.origin, mixedLettersWord)});
        

      }else{
        alert('Category was not found!');
      }
    }

    reportTimeLeftHandler(timeleft: number) {
      if (timeleft == 0){
        console.log('stoooooooooooooop!')
      }
    }
      
    check_answer(){
      const answer = this.categoryWords[this.step].guess;
      this.categoryWords[this.step].guess = answer;
      
      if (answer === this.categoryWords[this.step].origin){
        this.results.set(this.categoryWords[this.step], true);
        this.correctAnswers++;
        let dialogRef = this.dialogService.open(
          ResultDialogComponent, 
          {data: {resultMessage : "Great Job!", buttonContent: "CONTINUE"}});
      }else{
        this.results.set(this.categoryWords[this.step], false);
        let dialogRef = this.dialogService.open(
        ResultDialogComponent, 
        {data: {resultMessage : "Incorrect, Give it another try", buttonContent: "GOT IT"}});
      }
  
      this.step++;
      this.points = Math.floor((this.correctAnswers) * (100 / this.categoryWords.length));

      if (this.step === this.categoryWords.length){
        this.gamesPointsService.addGamePlayed(new GamePlayed(this.selectedCategory.id, 3, new Date(), this.points));

        const navigationDetails: any[] = ['/mixed-letters-game-results', JSON.stringify({results : Array.from(this.results.entries()), 
                                                    correctAnswers : this.correctAnswers, 
                                                    totalAnswers: this.categoryWords.length, 
                                                    selectedCategoryName : this.selectedCategory.name})];
        this.router.navigate(navigationDetails);

      }


    }

    
    stopGame():void{
      console.log('dsadasdassad')
    }
    
    getMixedWord(word : string): string {
      let mixedWord = word;
      while(mixedWord.replaceAll(' ', '') === word) mixedWord = word.split('').sort(()=> 0.5 - Math.random()).join(' ');
      return mixedWord;
    }
  
}
