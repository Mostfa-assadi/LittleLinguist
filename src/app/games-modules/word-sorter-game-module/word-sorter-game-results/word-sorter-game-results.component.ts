import { Component, Input, OnInit } from '@angular/core';
import { TranslatedWord } from '../../../../shared/model/translated-word';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-word-sorter-game-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './word-sorter-game-results.component.html',
  styleUrl: './word-sorter-game-results.component.css'
})
export class WordSorterGameResultsComponent implements OnInit {

  passedObjects: any;
  grade!: number;

  
  constructor(private router: ActivatedRoute){}

  ngOnInit(): void {
    const passedObjectsString = this.router.snapshot.paramMap.get('passedObjects');
    if (passedObjectsString) {
      this.passedObjects = JSON.parse(passedObjectsString);
    } else {
      console.error('Passed objects string is null.');
    }
    this.grade = Math.floor(this.passedObjects.correctAnswers / this.passedObjects.totalAnswers * 100);

  }

}
