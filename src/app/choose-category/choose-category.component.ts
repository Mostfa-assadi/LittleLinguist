import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-choose-category',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule,
    CategoryCardComponent],
  templateUrl: './choose-category.component.html',
  styleUrl: './choose-category.component.css'
})
export class ChooseCategoryComponent implements OnInit{
  allCategories : Category[] = [];
  creditPoints? : number;
  constructor(private categoriesService : CategoriesService, private dialogService : MatDialog) {}

  ngOnInit(): void {
    this.allCategories = this.categoriesService.list();
    this.creditPoints = 0;
  }

}
