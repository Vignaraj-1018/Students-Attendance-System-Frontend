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
    return this.http.post(endPoint,userDetails);
  }

  getAttendance(userId:any){
    let param = "?userId=" + userId;
    const endPoint = this.backendUrl + EndPoints.USER_ALL_ATTENDANCE + param;
    return this.http.get(endPoint);
  }
  
}
