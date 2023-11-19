import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { AttendanceServiceService } from '../attendance-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private helperService: HelperService, private attendanceService: AttendanceServiceService) { }

  userInfo:any;
  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    this.getUserAttendance();
  }

  getUserAttendance(){
    this.attendanceService.getAttendance(this.userInfo.userId).toPromise().then((resp)=>{
      console.log(resp);
    })
    .catch((e)=>{
      console.log(e);
    })
  }

}
