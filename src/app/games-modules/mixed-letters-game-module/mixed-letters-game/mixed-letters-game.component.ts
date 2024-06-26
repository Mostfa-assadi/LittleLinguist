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
  categoryWords: TranslatedWord[] = [];
  mixedLettersWords : Map<string, string> = new Map<string, string>();
  answer!: string;
  results: Map<TranslatedWord, boolean> = new Map<TranslatedWord, boolean>();
  correctAnswers : number = 0;
  points : number = 0;
  gameTime!: string ;
  timeLeft!: number;
  constructor (private categoriesService : CategoriesService, 
    private gamesPointsService : GamesPointsService, 
    private dialogService : MatDialog, 
    private router: Router){}

    ngOnInit(): void {
      
      this.categoriesService.get(this.categoryId).then((selectedCategory) => {
        if (selectedCategory){
          this.selectedCategory = selectedCategory;
          this.categoryWords = this.categoryWords.concat(this.selectedCategory.words.sort(() => 0.5 - Math.random()));
          this.mixedLettersWords = new Map<string, string>(); 
          this.gameTime = String(this.categoryWords.length * 5);
          for(let i = 0; i < this.categoryWords.length; i++){
            let word = this.categoryWords[i].origin; 
            let mixedWord = this.mixLetters(word);
            while(mixedWord === word) mixedWord = this.mixLetters(word);
            this.mixedLettersWords.set(word, mixedWord);

          }
        }else{
          alert('Category was not found!');
        }});
    }


    reportTimeLeftHandler(timeleft: number) {
      if (timeleft == 0){
        alert('Time out!');
        this.gamesPointsService.addGamePlayed(new GamePlayed(this.selectedCategory.id, 3, new Date(), this.points, 0, new Number(this.gameTime).valueOf()));

        const navigationDetails: any[] = ['/mixed-letters-game-results', JSON.stringify({results : Array.from(this.results.entries()), 
                                                    correctAnswers : this.correctAnswers, 
                                                    totalAnswers: this.categoryWords.length, 
                                                    selectedCategoryName : this.selectedCategory.name})];
        this.router.navigate(navigationDetails);
      }else{
        this.timeLeft = timeleft;
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

      if (this.step === this.categoryWords.length && this.selectedCategory !== undefined){
        this.gamesPointsService.addGamePlayed(new GamePlayed(this.selectedCategory.id, 3, new Date(), this.points, this.timeLeft, new Number(this.gameTime).valueOf() - this.timeLeft));

        const navigationDetails: any[] = ['/mixed-letters-game-results', JSON.stringify({results : Array.from(this.results.entries()), 
                                                    correctAnswers : this.correctAnswers, 
                                                    totalAnswers: this.categoryWords.length, 
                                                    selectedCategoryName : this.selectedCategory.name})];
        this.router.navigate(navigationDetails);

      }


    }

    mixLetters(word : string): string{
      let chars = word.split('');

      for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      
      // Join the shuffled array back into a string
      return chars.join('');


    }

    
  
}
