import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';
import { AttendanceServiceService } from './attendance-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    if(sessionStorage.getItem("viewAnalyticsSend")){
      console.log("Old Session");
    }
    else{
      sessionStorage.setItem("viewAnalyticsSend", "true");
      console.log("New Session");
      let data = {
        name:"Student Attendance Tracker",
        url:"https://student-attendance-tracker.vercel.app/"
      }
      this.attendanceService.sendViewCount(data).toPromise()
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }

  userInfo: string;
  constructor(private router: Router, private helperService: HelperService, private attendanceService: AttendanceServiceService){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(this.userInfo){
      this.helperService.userInfo = this.userInfo;
      // this.router.navigateByUrl('/dashboard');
    }
  }
  
  
}
