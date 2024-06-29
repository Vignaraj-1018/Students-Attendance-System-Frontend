import { Component, inject } from '@angular/core';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private attendanceService = inject(AttendanceService);
  private helperService = inject(HelperService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  userId: string = this.helperService.userInfo.userDetails.userId;

  ngOnInit() {
    // this.userId = ;
    console.log(this.userId);
    this.fetchAttendanceSummary();
  }

  fetchAttendanceSummary() {
    this.attendanceService.getAttendanceSummary(this.userId).subscribe({
      next:(resp) => {
        console.log(resp);
      },
      error:(err) => {
        console.log(err.status);
        if(err.status === 401 ){
          this.helperService.logOut();
          this.toastr.error("Session Expired! Please Log in again!");
          this.router.navigateByUrl('/login');
        }
      }
    });
  }

}
