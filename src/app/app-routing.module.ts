import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {
    path:"login",
    component: LoginPageComponent
  },
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"dashbaord",
    component: DashboardComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
