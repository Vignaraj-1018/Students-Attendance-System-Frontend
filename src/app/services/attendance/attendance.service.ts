import { Injectable, inject } from '@angular/core';
import { BACKEND_API_URL, EndPoints } from '../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor() { }

  private backendUrl:string  = BACKEND_API_URL;
  private http = inject(HttpClient);

  getAttendanceSummary(userId:string){
    return this.http.get(`${this.backendUrl + EndPoints.ATTENDANCE_SUMMARY}?userId=${userId}`);
  }
  
}
