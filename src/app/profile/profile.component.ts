import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { AttendanceServiceService } from '../attendance-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  userProfile: any;
  remainderToggle: any;

  constructor(private attendanceService: AttendanceServiceService, private helperService: HelperService) { }

  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    if(this.userInfo){
      this.userProfile = this.userInfo.name[0];
    }
    this.remainderToggle = this.userInfo.notificationEnabled;
    console.log(this.userInfo, this.remainderToggle);
  }

  handleRemainderToggle(){
    console.log("Remainder Toggle triggered");
    if(this.userInfo.notificationEnabled){
      if(confirm("Are you Sure to Disable the Daily Remainder?")){
        this.attendanceService.disableDailyRemainder(this.userInfo).toPromise()
        .then((resp:any)=>{
          console.log(resp);
          this.helperService.userInfo.notificationEnabled = false;
          localStorage.setItem("userInfo",JSON.stringify(this.helperService.userInfo));
        })
        .catch((err:any)=>{
          console.log(err);
        })
      }
      else{
        this.remainderToggle = true;
      }
    }
    else{
      if(confirm("Are you Sure to Enable the Daily Remainder?")){
        this.attendanceService.enableDailyRemainder(this.userInfo).toPromise()
        .then((resp:any)=>{
          console.log(resp);
          this.helperService.userInfo.notificationEnabled = true;
          localStorage.setItem("userInfo",JSON.stringify(this.helperService.userInfo));
        })
        .catch((err:any)=>{
          console.log(err);
        })
      }
      else{
        this.remainderToggle = false;
      }
    }
  }
}
