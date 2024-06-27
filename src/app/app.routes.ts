import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ValidateOtpComponent } from './components/validate-otp/validate-otp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path:'validate-otp', component:ValidateOtpComponent},
    {path:'dashboard', component:DashboardComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'forgot-password', component:ForgotPasswordComponent}
];
