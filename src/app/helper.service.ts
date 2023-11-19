import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  userInfo;
  public triggerFunctionSubject = new Subject<String>();

  constructor(private router: Router) { }

  ngOnChanges(){
    console.log(this.userInfo);
  }

  signOut(){
    this.userInfo = null;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/');
  }
}
