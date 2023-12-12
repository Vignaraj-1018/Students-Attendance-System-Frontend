import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private helperService: HelperService) { }

  userInfo: any;
  userProfile: any;
  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    this.getUserName();
    this.helperService.triggerFunctionSubject.subscribe((prompt)=>{
      if(prompt === "userLoggedIn" || prompt === "userSignedUp"){
        this.userInfo = this.helperService.userInfo;
        this.getUserName();
      }
      console.log(prompt);
    });
  }

  getUserName() {
    if(this.userInfo){
      this.userProfile = this.userInfo.name[0];
    }
  }

  gotoLogin(){
    this.router.navigateByUrl("/login");
  }

  gotoHome(){
    this.router.navigateByUrl("/");
  }

  gotoDashboard(){
    this.router.navigateByUrl("/dashboard");
  }

  signOut(){
    this.userProfile = null;
    this.helperService.signOut();
  }

}
