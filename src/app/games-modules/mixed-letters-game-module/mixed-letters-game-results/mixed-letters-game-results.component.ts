import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-mixed-letters-game-results',
    standalone: true,
    templateUrl: './mixed-letters-game-results.component.html',
    styleUrl: './mixed-letters-game-results.component.css',
    imports: [CommonModule, MatCardModule, MatIconModule, RouterModule]
})
export class MixedLettersGameResultsComponent {
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
    this.grade = Math.floor(this.passedObjects.correctAnswers * (100 / this.passedObjects.totalAnswers ));
  }

}
