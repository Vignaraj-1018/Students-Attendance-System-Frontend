import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EndPoints } from './constants/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  private backendUrl:  any;

  constructor(private http: HttpService) {
    this.backendUrl =  "https://lofty-door-405004.el.r.appspot.com";
  }

  loginUser(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.LOGIN_USER;
    return this.http.post(endPoint,userDetails);
  }

  signUpUser(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.SIGNUP_USER;
    return this.http.post(endPoint,userDetails);
  }

  submitOtp(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.VALIDATE_OTP;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  reSendOtp(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.RESEND_OTP;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  getAttendance(userId:any){
    let param = "?userId=" + userId;
    const endPoint = this.backendUrl + EndPoints.USER_ALL_ATTENDANCE + param;
    return this.http.get(endPoint);
  }
  
}
