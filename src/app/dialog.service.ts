import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWordComponent } from './add-word/add-word.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open(data: any) {

    return this.dialog.open(AddWordComponent, {

      data: data

    });
  }
}
