import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { AttendanceServiceService } from '../attendance-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  userProfile: any;
  remainderToggle: any;
  overallAttendance: [];
  academicList: {[key: string]: any} ={};
  academicList1: any=[];
  resetPassword: boolean = false;
  oldPassword: any;
  newPassword: any;
  repeatNewPassword: any;
  passwordVisible: boolean = false;
  constructor(private attendanceService: AttendanceServiceService, private helperService: HelperService, private router:Router) { }

  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    if(this.userInfo){
      this.userProfile = this.userInfo.name[0];
    }
    this.remainderToggle = this.userInfo.notificationEnabled;
    console.log(this.userInfo, this.remainderToggle);
    this.getUserAttendance();
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

  getUserAttendance(){
    this.attendanceService.getAttendance(this.userInfo.userId).toPromise().then((resp:any)=>{
      console.log(resp);
      this.overallAttendance = resp;
      this.prepareAttendaceData();
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  prepareAttendaceData(){
    console.log(this.overallAttendance);
    this.overallAttendance.forEach((element:any) => {
      console.log(element);
      if(element.academicYear in this.academicList){
        this.academicList[element.academicYear].push({semester:element.semester,subjectCount:element.subjectList.length,lastModifiedDate:element.lastModifiedDate});
      }
      else{
        this.academicList[element.academicYear] = [];
        this.academicList[element.academicYear].push({semester:element.semester,subjectCount:element.subjectList.length,lastModifiedDate:element.lastModifiedDate});
      }
    });
    console.log(this.academicList);
    Object.keys(this.academicList).forEach((item)=>{
      this.academicList1.push({academicYear:item, semesterList:this.academicList[item].sort((a, b) => a.semester - b.semester)});
    })
    console.log(this.academicList,this.academicList1);
  }

  handleResetPassword(){
    this.resetPassword = true;  
  }

  onOldPasswordChange(event){
    this.oldPassword = event.target.value;
  }

  onNewPasswordChange(event){
    this.newPassword = event.target.value;
  }

  onRepeatNewPasswordChange(event){
    this.repeatNewPassword = event.target.value;
  }

  onSubmitResetPassword(e){
    e.preventDefault();
    console.log(this.oldPassword,this.newPassword,this.repeatNewPassword);
    
    if(this.newPassword !== this.repeatNewPassword){
      alert("New Password and Repeat New Password should be same");
      return;
    }

    let userDetails = {
      "userEmail": this.userInfo.userEmail,
      "password": this.oldPassword
    }
    
    this.attendanceService.loginUser(userDetails).toPromise().then((resp:any)=>{
      console.log(resp);
      this.resetPasswordHandler();
      })
      .catch((err:any)=>{
        console.log(err);
        alert("Wrong Password");
      });
  }

  resetPasswordHandler(){
    let postObj = {
      userId: this.userInfo.userId,
      password: this.newPassword
    }

    this.attendanceService.resetPassword(postObj).toPromise()
    .then((resp:any)=>{
      console.log(resp);
    })
    .catch((err)=>{
      console.log(err);
    });

    this.resetPassword = false;
    alert("Password Reset Successful");
  }

  resetPasswordFields(){
    this.oldPassword = "";
    this.newPassword = "";
    this.repeatNewPassword = "";
  }

}
