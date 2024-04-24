import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  page: number = 1;

  constructor(private attendanceService: AttendanceServiceService, private router: Router, private helperService: HelperService, private ngxService: NgxUiLoaderService) { }

  userEmail:any;
  userpwd:any;
  userId:any;
  userOtp:any;
  otpResent:boolean = false;

  passwordVisible: boolean = false;

  ngOnInit() {
  }

  onEmailChange(event: any) {
    this.userEmail = event.target.value;
  }

  onPwdChange(event: any) {
    this.userpwd = event.target.value;
  }

  onOTPChange(event: any) {
    this.userOtp = event.target.value;
  }

  submitLogin(event){
    event.preventDefault();
    // console.log(this.userEmail,this.userpwd);
    let userDetails = {
      "userEmail": this.userEmail,
      "password": this.userpwd
    }
    
    this.ngxService.start();

    this.attendanceService.loginUser(userDetails).toPromise().then((resp:any)=>{
      // console.log(resp);
      localStorage.setItem("userId",resp.userId);
      localStorage.setItem("userInfo",JSON.stringify(resp));
      this.helperService.userInfo = resp;
      this.helperService.triggerFunctionSubject.next("userLoggedIn");
      this.router.navigateByUrl("/dashboard");
      this.ngxService.stop();
    })
    .catch((e)=>{
      this.ngxService.stop();
      console.log(e);
      alert(e.error);
    })
  }

  gotoSignup(){
    this.router.navigateByUrl("/signup");
  }

  gotoForgotPassword(){
    this.page = 2;
  }

  forgotPasswordRequest(event){
    event.preventDefault();
    this.ngxService.start();
    // console.log(this.userEmail,this.userpwd);
    let userDetails = {
      "userEmail": this.userEmail
    }

    this.attendanceService.forgotPasswordRequest(userDetails).toPromise().then((resp: any)=>{
      // console.log(resp);
      this.ngxService.stop();
      this.userId = JSON.parse(resp).userId;
      this.page = 3;
    })
    .catch((e)=>{
      console.log(e);
      this.ngxService.stop();
      alert(e.error);
    });
  }

  validateOTP(e){
    e.preventDefault();
    // console.log("here", this.userOtp);
    let postObj = {
      userId: this.userId,
      OTP: this.userOtp
    }

    this.ngxService.start();
    this.attendanceService.submitOtp(postObj).toPromise()
    .then((resp:any)=>{
      this.ngxService.stop();
      // console.log(resp,1);
      this.page = 4;
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      if(err.error == "User Already Authenticated"){
        this.page = 4;
      }
      alert(err.error);
    })
  }

  resendOtp(){
    // console.log("resending otp...");
    
    let postObj = {
      userEmail: this.userEmail
    }
    
    this.ngxService.start();
    this.attendanceService.reSendOtp(postObj).toPromise()
    .then((resp)=>{
      this.otpResent = true;
      this.ngxService.stop();
      // console.log(resp,1);
      alert(resp+ "\nPLease Check the Mail")
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      alert(err.error);
    });
  }

  resetPassword(e){
    e.preventDefault();
    let postObj = {
      userId: this.userId,
      password: this.userpwd
    }

    this.ngxService.start();
    this.attendanceService.resetPassword(postObj).toPromise()
    .then((resp:any)=>{
      this.ngxService.stop();
      // console.log(resp,1);
      this.page = 1;
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      alert(err.error);
    })
  }

}
