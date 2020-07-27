import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerAddComponent } from './computer-add/computer-add.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: ComputerListComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers/add',
    component: ComputerAddComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
