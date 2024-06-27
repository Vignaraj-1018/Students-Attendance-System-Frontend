import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

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

  constructor(@Inject(UserService) private UserService: UserService, @Inject(HelperService) private helperService:HelperService, private router:Router) { }

  handleSubmit(e: Event){
    e.preventDefault();
    // console.log(this.userEmail, this.password);
    let data = {
      userEmail: this.userEmail,
      password:  this.password
    }

    this.UserService.loginUser(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.helperService.login(resp);
      this.helperService.sendMessage("userLoggedIn");
      if(resp.userDetails.authenticated){
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.router.navigateByUrl('/validate-otp');
      }
    });
    

  }

}
