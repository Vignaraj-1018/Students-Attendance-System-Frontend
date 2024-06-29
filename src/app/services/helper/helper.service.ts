import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  userInfo:any;
  private messageSubject = new BehaviorSubject<string>('');
  
  constructor(private router:Router) { }


  currentMessage = this.messageSubject.asObservable();

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }

  login(userDetails:any){
    this.userInfo = userDetails;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUserDetails(){
    if(this.userInfo){
      return this.userInfo;
    }
    else{
      this.userInfo = localStorage.getItem('userInfo');
      this.userInfo = JSON.parse(this.userInfo);
      return this.userInfo;
    }
  }

  getUserEmail(){
    if(this.userInfo){
      return this.userInfo.userDetails.userEmail;
    }
    else{
      let forgotPassword = localStorage.getItem('forgotPassword');
      if(forgotPassword){
        return JSON.parse(forgotPassword).userEmail;
      }
    }
  }

  logOut(){
    this.userInfo = null;
    localStorage.removeItem('userInfo');
    this.router.navigateByUrl('/');
  }

  getLoginStatus(){

    this.userInfo = localStorage.getItem('userInfo');
    if(this.userInfo){
      this.userInfo = JSON.parse(this.userInfo);
      return true;
    }
    return false;
  }

  validateOtp(){
    if(this.userInfo){
      this.userInfo.userDetails.authenticated = true;
      this.login(this.userInfo);
      this.router.navigateByUrl('/dashboard');
    }
    else{
      let forgotPassword = localStorage.getItem('forgotPassword');
      if(!forgotPassword){
        return;
      }
      forgotPassword = JSON.parse(forgotPassword).userEmail;
      localStorage.setItem('forgotPassword',JSON.stringify({userEmail:forgotPassword, otpValidated:true}));
      this.router.navigateByUrl('/forgot-password')
    }
  }

  startLoader(){
    this.sendMessage("start-loader");
  }
  
  stopLoader(){
    this.sendMessage("stop-loader");
  }
}
