import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  private backendUrl:string  = 'https://student-attendance-api.el.r.appspot.com';

  loginUser(loginDetails: any){
    return this.http.post(`${this.backendUrl+EndPoints.USER_LOGIN}`, loginDetails);  
  }

  resetPassword(userDetails: any){
    return this.http.post(this.backendUrl+EndPoints.USER_RESET_PASSWORD,userDetails);
  }

  welcomeUser(): Observable<any>{
    return this.http.get(this.backendUrl);
  }
}
