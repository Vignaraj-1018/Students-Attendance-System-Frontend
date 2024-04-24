import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EndPoints } from './constants/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  private backendUrl:  any;
  private myHelperApi: string;

  constructor(private http: HttpService) {
    this.backendUrl =  "https://lofty-door-405004.el.r.appspot.com";
    this.myHelperApi = "https://helper-api-vignu.el.r.appspot.com";
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

  forgotPasswordRequest(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.REQUEST_FORGOT_PASSWORD;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  resetPassword(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.RESET_PASSWORD;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  getAttendance(userId:any){
    let param = "?userId=" + userId;
    const endPoint = this.backendUrl + EndPoints.USER_ALL_ATTENDANCE + param;
    return this.http.get(endPoint);
  }

  updateAttendance(attendance:any){
    const endPoint = this.backendUrl + EndPoints.USER_UPDATE_ATTENDANCE;
    return this.http.put(endPoint,attendance);
  }

  enableDailyRemainder(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.USER_ENABLE_REMAINDER;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  disableDailyRemainder(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.USER_DISABLE_REMAINDER;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  updateUser(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.UPDATE_USER;
    return this.http.post(endPoint,userDetails,{responseType:'text/json'});
  }

  contactMe(emailDetails:any){
    const endPoint = this.backendUrl + EndPoints.CONTACT_ME;
    return this.http.post(endPoint,emailDetails,{responseType:'text/json'});
  }

  contactMeHomePage(emailDetails:any){
    const endPoint = this.myHelperApi + "/mail_merchant/sendmail/6439b57fa69037f206b91648"
    return this.http.post(endPoint,emailDetails,{responseType:'text/json'});

  }
  
}
