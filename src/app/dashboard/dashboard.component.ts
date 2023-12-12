import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { AttendanceServiceService } from '../attendance-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private helperService: HelperService, private attendanceService: AttendanceServiceService, private ngxService: NgxUiLoaderService) { }

  userInfo:any;
  isAthenticated:boolean = true;
  otpResent:boolean = false;
  userOtp :any;
  page:number;
  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    this.isAthenticated = this.userInfo.authenticated;
    if(!this.isAthenticated) {
      this.page = 1;
    }
    else{
      this.page = 3;
    }
    console.log(this.userInfo, this.isAthenticated);
    this.getUserAttendance();
    this.helperService.triggerFunctionSubject.subscribe((prompt)=>{
      if(prompt === "userSignedUp"){
        this.page = 2;
      }
      console.log(prompt);
    });
  }

  getUserAttendance(){
    this.attendanceService.getAttendance(this.userInfo.userId).toPromise().then((resp)=>{
      console.log(resp);
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  gotoOtpPrompt(){
    this.page = 2;
  }

  submitOtp(e){
    e.preventDefault();
    console.log("here", this.userOtp);
    let postObj = {
      userId: this.userInfo.userId,
      OTP: this.userOtp
    }

    this.ngxService.start();
    this.attendanceService.submitOtp(postObj).toPromise()
    .then((resp:any)=>{
      this.ngxService.stop();
      this.page = 3;
      this.userInfo.authenticated = true;
      console.log(resp,1);
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo",resp);
      console.log(resp,1);
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      if(err.error == "User Already Authenticated"){
        this.page = 3;
        this.userInfo.authenticated = true;
      }
      alert(err.error);
    })
  }

  resendOtp(){
    console.log("resending otp...");
    
    let postObj = {
      userEmail: this.userInfo.userEmail,
    }
    
    this.ngxService.start();
    this.attendanceService.reSendOtp(postObj).toPromise()
    .then((resp)=>{
      this.otpResent = true;
      this.ngxService.stop();
      console.log(resp,1);
      alert(resp+ "\nPLease Check the Mail")
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      alert(err.error);
    })
  }

  onInputOtp(e){
    this.userOtp = e.target.value; 
  }

}
