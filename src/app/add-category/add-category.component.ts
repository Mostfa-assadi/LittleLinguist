import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import {FooterComponent} from '../footer/footer.component'
import { Router, RouterLink, RouterModule } from '@angular/router';
import {Category, synonym, ServiceService} from '../service.service'
import { FormsModule, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule ,MatInputModule, MatTableModule, MatIconModule, MatFormField, MatInputModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{

  category_name = '';
  displayedColumns: string[] = ['Origin', 'Dest', 'Actions'];
  dataSource !: MatTableDataSource<synonym>;
  categoryForm!: FormGroup;
  current_category!: Category;
  new_source_word = '';
  new_target_word = '';

  constructor(private cdr: ChangeDetectorRef,    private router: Router,public dialog: MatDialog, private categoriesService:ServiceService){
  }
  onSubmit(formData: any) {
    this.current_category.category_name = formData.category_name;
    this.categoriesService.add_category(this.current_category);
    this.router.navigate(['']);

  }
  ngDoCheck(): void {
  
    this.dataSource._updateChangeSubscription();
  }
  ngOnInit(): void {

    this.current_category = this.categoriesService.open_new_category();
    this.category_name = this.current_category.category_name;
      this.dataSource = new MatTableDataSource<synonym>(this.current_category.words_list);
      this.dataSource._updateChangeSubscription();
  }

  add_word(){
    if (this.new_source_word.length < 1 || this.new_target_word.length < 1) {
      // Handle the case where the inputs are empty
      return;
    }
    this.categoriesService.add_word_to_category(this.current_category, this.new_source_word, this.new_target_word);
    this.dataSource._updateChangeSubscription();
    this.new_source_word = '';
    this.new_target_word = '';
  
  }

  delete_word(element: synonym) {

    const dialogRef = this.dialog.open(PopupComponent, {
    });
    dialogRef.afterClosed().subscribe((result: { data: any; }) => {

      if (result.data) {
        this.categoriesService.delete_word_from_category(this.current_category, element);
        this.dataSource.data = this.current_category.words_list;
        this.cdr.detectChanges();

        console.log('Confirmed data:', result.data);
      } else {

        console.log('Dialog closed without confirmation.');
      }
    });


  }

}
