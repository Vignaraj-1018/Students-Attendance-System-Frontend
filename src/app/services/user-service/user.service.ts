import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL, EndPoints } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  private backendUrl:string  = BACKEND_API_URL;

  loginUser(loginDetails: any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_LOGIN}`, loginDetails);  
  }

  signUpUser(loginDetails:any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_SIGNUP}`, loginDetails);  
  }

  validateOtp(userDetails:any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_VALIDATE_OTP}`, userDetails);  
  }

  forgotPassword(userDetails:any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_FORGOT_PASSWORD}`, userDetails);  
  }

  resendOtp(userDetails:any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_RESEND_OTP}`, userDetails);
  }

  resetPassword(userDetails: any){
    return this.http.post(this.backendUrl+EndPoints.USER_RESET_PASSWORD,userDetails);
  }

  welcomeUser(): Observable<any>{
    return this.http.get(this.backendUrl);
  }
}
