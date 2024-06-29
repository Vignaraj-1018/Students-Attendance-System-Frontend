import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HelperService } from './services/helper/helper.service';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Students-Attendance-System';
  constructor(@Inject(UserService) private userService:UserService, @Inject(HelperService) private helperService:HelperService) {}

  ngOnInit(): void {
    this.helperService.getLoginStatus();
    console.log(this.helperService.userInfo);
  }
}
