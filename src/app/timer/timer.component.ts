import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy{
  timer : any;
  @Input() duration !: string;
  durationAsNumber : number = 0;
  seconds: number = 0;
  minutes : number = 0;
  @Output() reportTimeLeft: EventEmitter<number> = new EventEmitter<number>();

  constructor() {

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.durationAsNumber = Number(this.duration);
    this.minutes = Math.floor(this.durationAsNumber / 60);
    this.seconds = this.durationAsNumber % 60;

    this.timer = setInterval(() => {
      if (this.durationAsNumber > 0) {
        this.durationAsNumber--;
        this.minutes = Math.floor(this.durationAsNumber / 60);
        this.seconds = this.durationAsNumber % 60;
      }
      else{
          clearInterval(this.timer);
          this.reportTimeLeft.emit(this.durationAsNumber);
      }
    }, 1000);

  }

}
