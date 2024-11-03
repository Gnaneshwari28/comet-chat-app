import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { AuthService } from '../auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // constructor(private authService: AuthService, private router: Router,
  // ){}

  // @Output() toggleRegistration = new EventEmitter<void>();

  // userID = '';
  // apiKey = environment.comet.apiKey; 
  // errorMessage = '';


//   onSubmit() {
//      console.log(this.userID,this.apiKey);
//     CometChat.login(this.userID, this.apiKey).then(
//       user => {
//         console.log('Login successful:', user);
//         this.router.navigate(['/chat']);
//       },
//       error => {
//         this.errorMessage = 'Login failed. Please check your User ID.';
//         console.error('Login failed:', error);
//       }
//     );
  
//  }

//   toggleRegistrationFunction() {
//     this.router.navigate(['/register']);
//     // this.toggleRegistration.emit(); 
//   }

userID = '';
  apiKey = environment.comet.apiKey; 
  errorMessage = '';
constructor(private authService: AuthService, private router: Router) {}

async onSubmit() {
  try {
    await CometChat.login(this.userID, this.apiKey);
    console.log('Login successful:', this.userID);
    // You might want to store user data (like JWT) if required
    this.router.navigate(['/chat']); // Navigate to chat component after login
  } catch (error) {
    this.errorMessage = 'Login failed. Please check your User ID.';
    console.error('Login failed:', error);
  }
}

toggleRegistrationFunction() {
  this.router.navigate(['/register']);
}


}
