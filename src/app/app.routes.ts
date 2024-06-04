import { Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ChooseCategoryComponent } from './choose-category/choose-category.component';
import { MatchingGameComponent } from './games-modules/matching-game-module/matching-game/matching-game.component';
import { MixedLettersGameComponent } from './games-modules/mixed-letters-game-module/mixed-letters-game/mixed-letters-game.component';
import { WordSorterGameComponent } from './games-modules/word-sorter-game-module/word-sorter-game/word-sorter-game.component';
import { WordSorterGameResultsComponent } from './games-modules/word-sorter-game-module/word-sorter-game-results/word-sorter-game-results.component';
import { MixedLettersGameResultsComponent } from './games-modules/mixed-letters-game-module/mixed-letters-game-results/mixed-letters-game-results.component';
import { TimerComponent } from './timer/timer.component';

export const routes: Routes = [
    {path: "", component: DashboardPageComponent},
    {path: "categories-list", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "help", component: HelpPageComponent},
    {path: "choose-category", component: ChooseCategoryComponent},
    {path: "matching-game/:categoryId", component:MatchingGameComponent},
    {path: "word-sorter-game/:categoryId", component:WordSorterGameComponent},
    {path: "mixed-letters-game/:categoryId", component:MixedLettersGameComponent},
    {path: "mixed-letters-game-results/:passedObjects", component:MixedLettersGameResultsComponent},
    {path: "word-sorter-game-results/:passedObjects", component:WordSorterGameResultsComponent},
    {path: "timer", component:TimerComponent}
];
