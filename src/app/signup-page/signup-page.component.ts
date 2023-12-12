import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';
import { HelperService } from '../helper.service';
import { Router } from '@angular/router';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private attendanceService:AttendanceServiceService, private helperService: HelperService, private router:Router, private ngxService: NgxUiLoaderService) { }

  userName: any;
  userPwd: any;
  userEmail: any;
  passwordVisible: boolean = false;

  ngOnInit() {
  }

  onEmailChange(event: any) {
    this.userEmail = event.target.value;
  }

  onPwdChange(event: any) {
    this.userPwd = event.target.value;
  }

  onNameChange(event: any) {
    this.userName = event.target.value;
  }

  submitSignup(event){
    event.preventDefault();
    console.log(this.userEmail,this.userPwd);
    let userDetails = {
      "name": this.userName,
      "userEmail": this.userEmail,
      "password": this.userPwd
    }

    this.ngxService.start();
    this.attendanceService.signUpUser(userDetails).toPromise().then((resp:any)=>{
      console.log(resp);
      localStorage.setItem("userId",resp.userId);
      localStorage.setItem("userInfo",JSON.stringify(resp));
      this.helperService.userInfo = resp;
      setTimeout(()=>{
        this.helperService.triggerFunctionSubject.next("userSignedUp");
      },500)
      this.router.navigateByUrl("/dashboard");
      this.ngxService.stop();
    })
    .catch((e)=>{
      console.log(e);
      this.ngxService.stop();
      alert(e.error);
    })
  }

}
