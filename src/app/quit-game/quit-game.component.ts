import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuitGameDialogComponent } from '../quit-game-dialog/quit-game-dialog.component';

@Component({
  selector: 'app-quit-game',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './quit-game.component.html',
  styleUrl: './quit-game.component.css'
})
export class QuitGameComponent {
  constructor(private dialogService : MatDialog, private router: Router){}

  confirm_quit() {
    let dialogRef = this.dialogService.open(QuitGameDialogComponent, {data: name});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const navigationDetails: string[] = ['/choose-category'];
        this.router.navigate(navigationDetails);
      }});
  }

}
