import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderbodyComponent } from './underbody/underbody.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  {
    path: 'dashboard',
    component: UnderbodyComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService] 
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
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
