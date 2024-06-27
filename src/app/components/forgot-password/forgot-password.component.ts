import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  userEmail: string = '';
  otpValidated: boolean = false;
  password: string = '';

  constructor(@Inject(UserService)private userService:UserService, private router:Router){}

  ngOnInit() {
    let forgotPassword = localStorage.getItem('forgotPassword');
    if(forgotPassword && JSON.parse(forgotPassword).otpValidated){
      this.otpValidated = true;
    }
    console.log(this.otpValidated);
  }

  submitEmail(event: Event){
    event.preventDefault();
    console.log(this.userEmail);
    let data = {
      userEmail: this.userEmail
    }

    this.userService.forgotPassword(data).subscribe((resp:any)=>{
      // console.log(resp);
      localStorage.setItem('forgotPassword', JSON.stringify({userEmail:this.userEmail, otpValidated:false}));
      this.router.navigateByUrl('/validate-otp');
    });
  }

  submitPassword(event:Event){
    event.preventDefault();
    console.log(this.password);
    let forgotPassword = localStorage.getItem('forgotPassword');
    if(forgotPassword && JSON.parse(forgotPassword).otpValidated){
      this.userEmail =JSON.parse(forgotPassword).userEmail;
    }
    let data = {
      userEmail: this.userEmail,
      password:  this.password
    }
    this.userService.resetPassword(data).subscribe((resp:any)=>{
      console.log(resp);
      localStorage.removeItem('forgotPassword');
      this.router.navigateByUrl('/login');
    });
  }

}
