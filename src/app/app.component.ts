import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service/user.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Students-Attendance-System';
  constructor(@Inject(UserService) private userService:UserService) {}

  ngOnInit(): void {
  }
}
