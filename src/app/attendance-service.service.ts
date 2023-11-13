import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EndPoints } from './constants/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class AttendanceServiceService {

  private backendUrl:  any;

  constructor(private http: HttpService) {
    this.backendUrl =  "http://localhost:8080";
  }

  loginUser(userDetails:any){
    const endPoint = this.backendUrl + EndPoints.LOGIN_USER;
    console.log(this.backendUrl);
    console.log(endPoint);
    return this.http.post(endPoint,userDetails);
  }
  
}
