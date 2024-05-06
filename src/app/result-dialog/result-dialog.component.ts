import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ResultDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
