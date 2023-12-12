import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupPageComponent } from './signup-page/signup-page.component';


const routes: Routes = [

  {
    path:"login",
    component: LoginPageComponent
  },
  {
    path:"signup",
    component: SignupPageComponent
  },
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
