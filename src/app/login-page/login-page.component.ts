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

  constructor(private attendanceService: AttendanceServiceService, private router: Router, private helperService: HelperService, private ngxService: NgxUiLoaderService) { }

  userEmail:any;
  userpwd:any;

  passwordVisible: boolean = false;

  ngOnInit() {
  }

  onEmailChange(event: any) {
    this.userEmail = event.target.value;
  }

  onPwdChange(event: any) {
    this.userpwd = event.target.value;
  }

  submitLogin(event){
    event.preventDefault();
    console.log(this.userEmail,this.userpwd);
    let userDetails = {
      "userEmail": this.userEmail,
      "password": this.userpwd
    }
    
    this.ngxService.start();

    this.attendanceService.loginUser(userDetails).toPromise().then((resp:any)=>{
      console.log(resp);
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

}
