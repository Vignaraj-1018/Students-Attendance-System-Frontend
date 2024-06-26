import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public router: Router){}

  openMenuToggle = false;

  gotoLogin(){
    this.router.navigateByUrl('/login');
  }

  openMenu(){
    this.openMenuToggle = true;
  }

  closeMenu(){
    this.openMenuToggle = false;
  }
}