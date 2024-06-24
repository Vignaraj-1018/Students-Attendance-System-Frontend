import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Students-Attendance-System';
  constructor(@Inject(UserService) private userService:UserService) {}

  ngOnInit(): void {
    this.userService.welcomeUser().subscribe(resp=>{
      console.log(resp);
    });
    this.userService.loginUser({'userEmail':"vignaraj03@gmail.com","password":"vignu123"}).subscribe(resp=>{
      console.log(resp);
    });
    this.userService.resetPassword({'userEmail':"vignaraj03@gmail.com","password":"vignu123"}).subscribe(resp=>{
      console.log(resp);
    })
  }
}
