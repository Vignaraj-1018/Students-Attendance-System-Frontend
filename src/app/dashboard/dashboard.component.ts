import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { AttendanceServiceService } from '../attendance-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  newSemester: any;
  
  constructor(private helperService: HelperService, private attendanceService: AttendanceServiceService, private ngxService: NgxUiLoaderService) { }
  
  userInfo:any;
  isAthenticated:boolean = true;
  otpResent:boolean = false;
  userOtp :any;
  page:number;
  academicYearList:any = [];
  semesterList:any = [];
  overallAttendance:any;
  selectedAcademicYear: any;
  selectedSemester: any;
  currentAttendance: any;
  addSemesterEnable:any;
  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    this.isAthenticated = this.userInfo.authenticated;
    if(!this.isAthenticated) {
      this.page = 1;
    }
    else{
      this.page = 3;
    }
    console.log(this.userInfo, this.isAthenticated);
    this.getUserAttendance();
    this.prepareAcademicYearList();
    this.helperService.triggerFunctionSubject.subscribe((prompt)=>{
      if(prompt === "userSignedUp"){
        this.page = 2;
      }
      console.log(prompt);
    });
  }

  prepareAcademicYearList() {
    let year= new Date().getFullYear();
    console.log(year);
    this.academicYearList.push((year-1)+'-'+year);
    this.academicYearList.push(year+'-'+(year+1));
    if(new Date().getMonth()>5){
      this.selectedAcademicYear = year+'-'+(year+1);
    }
    else{
      this.selectedAcademicYear = (year-1)+'-'+year;
    }
  }

  getUserAttendance(){
    this.attendanceService.getAttendance(this.userInfo.userId).toPromise().then((resp)=>{
      console.log(resp);
      this.overallAttendance = resp;
      this.prepareAttendaceData();
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  gotoOtpPrompt(){
    this.page = 2;
  }

  submitOtp(e){
    e.preventDefault();
    console.log("here", this.userOtp);
    let postObj = {
      userId: this.userInfo.userId,
      OTP: this.userOtp
    }

    this.ngxService.start();
    this.attendanceService.submitOtp(postObj).toPromise()
    .then((resp:any)=>{
      this.ngxService.stop();
      this.page = 3;
      this.userInfo.authenticated = true;
      console.log(resp,1);
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo",resp);
      console.log(resp,1);
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      if(err.error == "User Already Authenticated"){
        this.page = 3;
        this.userInfo.authenticated = true;
      }
      alert(err.error);
    })
  }

  resendOtp(){
    console.log("resending otp...");
    
    let postObj = {
      userEmail: this.userInfo.userEmail,
    }
    
    this.ngxService.start();
    this.attendanceService.reSendOtp(postObj).toPromise()
    .then((resp)=>{
      this.otpResent = true;
      this.ngxService.stop();
      console.log(resp,1);
      alert(resp+ "\nPLease Check the Mail")
    })
    .catch((err)=>{
      this.ngxService.stop();
      console.log(err,2);
      alert(err.error);
    })
  }

  onInputOtp(e){
    this.userOtp = e.target.value; 
  }

  onSelectAcademicYear(event){
    this.selectedAcademicYear = event.target.value;
    console.log(this.selectedAcademicYear);
    this.getSemesterList();
  }

  onSelectSemester(event){
    this.selectedSemester = event.target.value;
    console.log(this.selectedSemester);
    this.getCurrentAttendance();
  }

  prepareAttendaceData() {

    this.overallAttendance.forEach(element => {
      this.academicYearList.push(element.academicYear);
      console.log(element);
    });

    this.academicYearList = [...new Set(this.academicYearList)];
    this.academicYearList.sort((y1,y2)=>{
      if(parseInt(y1.slice(0,4))<parseInt(y2.slice(0,4))){
        return -1;
      }
      else{
        return 1;
      }
    });
    console.log(this.academicYearList);
    this.getSemesterList();

  }

  getSemesterList() {

    console.log(this.selectedAcademicYear, this.overallAttendance);
    this.semesterList = [];

    this.overallAttendance.forEach(element => {
      if(element.academicYear == this.selectedAcademicYear){
        this.semesterList.push(element.semester);
      }
    });

    console.log(this.semesterList);

    this.semesterList.sort((s1:number,s2:number)=>(s1-s2));

    console.log(this.semesterList);

    this.selectedSemester = this.semesterList[0];

    this.getCurrentAttendance();

  }

  getCurrentAttendance() {
    this.currentAttendance = null;
    this.overallAttendance.forEach((element:any) =>{
      if(element.academicYear == this.selectedAcademicYear && element.semester == this.selectedSemester){
        this.currentAttendance = element;
      }
    });

    console.log(this.currentAttendance);
  }

  onAddPresent(subject,type){
    console.log(subject);
    this.currentAttendance.subjectList.forEach(element => {
      if(element.subjectId === subject.subjectId){
        if(type){
          element.presentCount++;
          element.totalCount++;
        }
        else{
          element.presentCount--;
          element.totalCount--;
        }
      }
    });
    console.log(this.currentAttendance);
    this.updateAttendance();
  }

  onAddAbsent(subject,type){
    console.log(subject);
    this.currentAttendance.subjectList.forEach(element => {
      if(element.subjectId === subject.subjectId){
        if(type){
          element.totalCount++;
        }
        else{
          element.totalCount--;
        }
      }
    });
    console.log(this.currentAttendance);
    this.updateAttendance();
  }

  updateAttendance(){
    this.attendanceService.updateAttendance(this.currentAttendance).toPromise().then((resp)=>{
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteSubject(subject){
    if(confirm('Are you sure you want to delete')){
      console.log('Confirm delete');
      this.currentAttendance.subjectList.forEach((element,i) => {
        if(element.subjectId === subject.subjectId){
          this.currentAttendance.subjectList.splice(i,1);
        }
      });
      this.updateAttendance();
    }
    else{
      console.log("Cancel delete");
    }
  }

  editSubject(subject){
    console.log('Edit subject',subject);
    subject.editEnabled = true;
  }

  onSubjectNameChange(event,subject){
    subject.name = event.target.value;
    this.updateAttendance();
  }

  onAddNewSubject(){
    if(!this.currentAttendance){
      this.createAttendanceData();
    }
    else{
      let subject = {
        subjectId:uuidv4(),
        name:"",
        presentCount:0,
        totalCount:0,
        editEnabled:true
      }
      this.currentAttendance.subjectList.push(subject);
    }
  }
  createAttendanceData() {
    let attendance = {
      academicYear: this.selectedAcademicYear,
      semester:this.selectedSemester,
      subjectList:[],
      userId: this.userInfo.userId
    }
    if(this.semesterList.length === 0){
      alert("Please Add a semester");
    }
    else{
      this.currentAttendance = attendance;
      this.overallAttendance = [this.currentAttendance];
    }
  }

  getPercentToDisplay(subject){
    if(subject.totalCount){
      return ((subject.presentCount/subject.totalCount)*100).toFixed(2);
    }
    else{
      return '-';
    }
  }

  onSemesterChange(event){
    this.newSemester = parseInt(event.target.value);
  }

  disableAddSemester(){
    if(this.newSemester<=0 || this.semesterList.includes(this.newSemester)){
      alert("Invalid new semester");
    }
    else{
      this.semesterList.push(this.newSemester);
      this.selectedSemester = this.newSemester;
      this.addSemesterEnable = false;
      this.getCurrentAttendance();
    }
  }

}
