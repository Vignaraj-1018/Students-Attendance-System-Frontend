import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userEmail: string = '';
  password: string = '';

  constructor(@Inject(UserService) private UserService: UserService) { }

  handleSubmit(e: Event){
    e.preventDefault();
    console.log(this.userEmail, this.password);
    let data = {
      userEmail: this.userEmail,
      password:  this.password
    }

    this.UserService.loginUser(data).subscribe(resp=>{
      console.log(resp);
    });
    

  }

}
