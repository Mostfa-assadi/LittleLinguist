import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ MatDialogModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {};

  onConfirm(): void {
    this.dialogRef.close({ result: 'confirmed' , data: true});
  };

  onCancel(): void {
    this.dialogRef.close({ result: 'cancelled' , data: false});
  };

}

