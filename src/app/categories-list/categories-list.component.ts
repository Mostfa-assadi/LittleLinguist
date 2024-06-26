import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { categories } from '../../shared/data/categories';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'numOfWords', 'lastUpdateDate', 'actions'];
  dataSource : Category[] = [];
  
  constructor(private categoriesService : CategoriesService, private dialogService : MatDialog) {}

  ngOnInit(): void {
    this.categoriesService.list().then((categories: Category[]) => {
      this.dataSource = categories;
    });
  }
  
  deleteCategory(id : string, name: string) {
    let dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {data: name});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriesService.delete(id).then(() => {
          this.categoriesService.list().then((categories : Category[]) => {
            this.dataSource = categories;
          })
        })
      }
    });
  }
  
}