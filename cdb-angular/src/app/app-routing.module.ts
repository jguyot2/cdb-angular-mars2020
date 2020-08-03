import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { UnderbodyComponent } from './underbody/underbody.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: UnderbodyComponent,
    pathMatch: 'full'
  },
  {
    path: 'computers/add',
    component: ComputerAddComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
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
