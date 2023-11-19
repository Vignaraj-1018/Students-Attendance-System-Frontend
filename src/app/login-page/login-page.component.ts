import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private attendanceService: AttendanceServiceService, private router: Router, private helperService: HelperService) { }

  userEmail:any;
  userpwd:any;

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

    this.attendanceService.loginUser(userDetails).toPromise().then((resp:any)=>{
      console.log(resp);
      localStorage.setItem("userId",resp.userId);
      localStorage.setItem("userInfo",JSON.stringify(resp));
      this.helperService.userInfo = resp;
      this.helperService.triggerFunctionSubject.next("userLoggedIn");
      this.router.navigateByUrl("/dashboard");
    })
    .catch((e)=>{
      console.log(e);
      alert(e);
    })
  }

}
