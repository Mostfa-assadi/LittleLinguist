import { ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Language,Category, ServiceService, synonym } from '../service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, MatIconModule, MatTableModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  constructor(  private cdr: ChangeDetectorRef,    private router: Router,public dialog: MatDialog, private categoriesService:ServiceService){

  }
  displayedColumns: string[] = ['Category Name', 'No. of words', 'Last edit date', 'Actions'];
  dataSource = new MatTableDataSource<Category>(this.categoriesService.get_categories());
  
  ngDoCheck(): void {
  
    this.dataSource._updateChangeSubscription();
  }
    
  ngOnInit(): void {
    this.dataSource =  new MatTableDataSource<Category>(this.categoriesService.get_categories());
    
  }  

  delete_category(element: Category) {

    const dialogRef = this.dialog.open(PopupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);

      if (result.data) {
        this.categoriesService.delete_category(element.category_id);
        this.dataSource.data = this.categoriesService.get_categories();
        this.cdr.detectChanges();

        console.log('Confirmed data:', result.data);
      } else {

        console.log('Dialog closed without confirmation.');
      }
    });


  }

  

}
