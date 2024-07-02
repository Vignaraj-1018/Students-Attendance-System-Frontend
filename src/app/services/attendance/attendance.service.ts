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

  updateAttendance(attendanceDetails:any){
    return this.http.put(`${this.backendUrl + EndPoints.ATTENDANCE_UPDATE}`,attendanceDetails);
  }

  deleteAttendance(attendanceDetails:any){
    return this.http.delete(`${this.backendUrl + EndPoints.ATTENDANCE_DELETE}`,attendanceDetails);
  }

  getAttendanceById(attendanceId:string | null){
    return this.http.get(`${this.backendUrl + EndPoints.ATTENDANCE_GET_BY_ID}?attendanceId=${attendanceId}`);
  }
  
}
