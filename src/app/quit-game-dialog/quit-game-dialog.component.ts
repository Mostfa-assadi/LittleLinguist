import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-quit-game-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './quit-game-dialog.component.html',
  styleUrl: './quit-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class QuitGameDialogComponent {

}
