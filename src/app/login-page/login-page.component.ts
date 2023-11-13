import { Component, OnInit } from '@angular/core';
import { AttendanceServiceService } from '../attendance-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private attendanceService: AttendanceServiceService) { }

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

  submitLogin(){
    console.log(this.userEmail,this.userpwd);
    let userDetails = {
      "userEmail": this.userEmail,
      "password": this.userpwd
    }

    this.attendanceService.loginUser(userDetails).toPromise().then((resp)=>{
      console.log(resp);
    })
    .catch((e)=>{
      console.log(e);
      alert(e);
    })
  }

}
