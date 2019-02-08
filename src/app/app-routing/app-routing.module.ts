import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CityListComponent } from '../city-list/city-list.component';

const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'list'},
  { path: 'list', component: CityListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
