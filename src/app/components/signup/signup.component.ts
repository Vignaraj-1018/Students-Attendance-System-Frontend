import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  userEmail: string = '';
  password: string = '';
  name: string = '';

  constructor(@Inject(UserService) private UserService: UserService, @Inject(HelperService) private helperService:HelperService, private router:Router) { }

  handleSubmit(e: Event){
    e.preventDefault();
    console.log(this.userEmail, this.password);
    let data = {
      userEmail: this.userEmail,
      password:  this.password,
      name: this.name
    }

    this.UserService.signUpUser(data).subscribe(resp=>{
      console.log(resp);
      this.helperService.login(resp);
      this.helperService.sendMessage("userLoggedIn");
      this.router.navigateByUrl('/validate-otp');
    });
    

  }

}
