import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }

  userInfo: string;
  constructor(private router: Router, private helperService: HelperService){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(this.userInfo){
      this.helperService.userInfo = this.userInfo;
      this.router.navigateByUrl('/dashboard');
    }
  }
  
  
}
