import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDownOpen: boolean;

  constructor(private router: Router, private helperService: HelperService) { }

  userInfo: any;
  userProfile: any;
  ngOnInit() {
    this.userInfo = this.helperService.userInfo;
    this.getUserName();
    this.helperService.triggerFunctionSubject.subscribe((prompt)=>{
      if(prompt === "userLoggedIn" || prompt === "userSignedUp"){
        this.userInfo = this.helperService.userInfo;
        this.getUserName();
      }
      console.log(prompt);
    });
  }

  getUserName() {
    if(this.userInfo){
      this.userProfile = this.userInfo.name[0];
    }
  }

  gotoLogin(){
    this.router.navigateByUrl("/login");
  }

  gotoHome(){
    this.router.navigateByUrl("/");
  }

  gotoDashboard(){
    this.router.navigateByUrl("/dashboard");
  }

  gotoProfile(){
    this.router.navigateByUrl("/profile");
  }

  signOut(){
    this.userProfile = null;
    this.dropDownOpen = false;
    this.helperService.signOut();
  }

  dropDownTrigger(){
    this.dropDownOpen = !this.dropDownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.isClickInsideDropdown(event)) {
      this.dropDownOpen = false;
    }
  }

  isClickInsideDropdown(event: MouseEvent): boolean {
    const dropdownContainer = document.getElementById('dropdown-container');
    return dropdownContainer && dropdownContainer.contains(event.target as Node);
  }

}
