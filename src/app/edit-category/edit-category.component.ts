import { ChangeDetectorRef, Component , OnInit, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Category, ServiceService, synonym } from '../service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ MatTableModule, MatIconModule, FormsModule, MatFormField, MatInputModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  category_id = -1;
  category_name = '';
  displayedColumns: string[] = ['Origin', 'Dest', 'Actions'];
  dataSource !: MatTableDataSource<synonym>;
  categoryForm!: FormGroup;
  current_category!: Category;
  new_source_word = '';
  new_target_word = '';


  constructor(private cdr: ChangeDetectorRef,    private router: Router,public dialog: MatDialog, private categoriesService: ServiceService){
    // alert(this.category_id)
    // if (this.category_id !== -1)
  }
  ngDoCheck(): void {

  
  }
  ngOnInit(){
    this.category_id = Number(this.route.snapshot.params['category_id']);

    this.current_category = this.categoriesService.get_category(this.category_id);
  
    if (this.current_category) {
      this.category_name = this.current_category.category_name;
      this.dataSource = new MatTableDataSource<synonym>(this.current_category.words_list);
      this.dataSource._updateChangeSubscription();
    } else {
      console.error('Category not found for id:', this.category_id);
    }
  
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


  onSubmit(formData: any) {
    this.current_category.category_name = formData.category_name;
    this.current_category.category_name = this.category_name;
    this.categoriesService.update_category(this.current_category);
    this.router.navigate(['']);

  }

}
