import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  userInfo:any;
  isAuthenticated:boolean = false;
  private messageSubject = new BehaviorSubject<string>('');
  
  constructor(private router:Router) { }


  currentMessage = this.messageSubject.asObservable();

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }

  login(userDetails:any){
    this.userInfo = userDetails;
    this.isAuthenticated = true;
    localStorage.setItem("JWT_TOKEN", this.userInfo.jwtToken);
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

  isLoggedIn(){
    return !!localStorage.getItem('userInfo');
  }

  logOut(){
    this.userInfo = null;
    this.isAuthenticated = false;
    localStorage.removeItem('userInfo');
    localStorage.removeItem("JWT_TOKEN");
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

  isJWTExpired(){
    let token = localStorage.getItem('JWT_TOKEN');
    if(!token) return true;

    let decoded = jwtDecode(token);
    if (!decoded.exp) return true;

    let expirationDate = new Date(decoded.exp * 1000);
    let currentDate = new Date();

    return expirationDate < currentDate;
  }
}
