import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { HomeComponent } from './home/home.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

export const routes: Routes = [
        {path:'', component:HomeComponent, title:'Home'},
        {path:'addcategory', component:AddCategoryComponent, title:'Add category'},
        {path:'editcategory/:category_id', component:EditCategoryComponent, title:'Edit category'}
    ];

export const AppRoutingModule = RouterModule.forRoot(routes);

