import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceServiceService } from '../attendance-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userEmail: any;
  userName: any;
  userMessage: any;

  constructor(private router: Router, private attendanceService: AttendanceServiceService, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  gotoDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  onEmailChange(event: any) {
    this.userEmail = event.target.value;
  }

  onNameChange(event: any) {
    this.userName = event.target.value;
  }

  onMessageChange(event: any) {
    this.userMessage = event.target.value;
  }

  handleSubmit(event : Event){
    event.preventDefault();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    let data = {
      name: this.userName,
      mail: this.userEmail,
      subject:'Message from Student Attendance Tracker - ' + today,
      message: this.userMessage
    }
    this.ngxService.start();
    this.attendanceService.contactMeHomePage(data).toPromise()
    .then(() => {
      // console.log("Success");
      const contactForm = document.getElementById('contactForm') as HTMLFormElement;
      contactForm.reset();
      this.ngxService.stop();
    })
    .catch((err) => {
      console.log(err);
      alert(err)
      this.ngxService.stop();
    });
  }

}
