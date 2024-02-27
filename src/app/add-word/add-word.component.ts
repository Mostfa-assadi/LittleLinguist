import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-add-word',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './add-word.component.html',
  styleUrl: './add-word.component.css'
})
export class AddWordComponent {
  constructor(private _dialog: DialogService){
    var ref = this._dialog.open({name: "First Last"});
    //close the dialog
    ref.close()
  
  }


}
