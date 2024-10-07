import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { AuthService } from '../auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router ){}

  @Output() toggleRegistration = new EventEmitter<void>();

  userID = '';
  apiKey = '14a2d2e74bd7dcf66d0591b630bab73261f79e88'; 
  errorMessage = '';


  onSubmit() {
     
    CometChat.login(this.userID, this.apiKey).then(
      user => {
        console.log('Login successful:', user);
        this.router.navigate(['/chat']);
      },
      error => {
        this.errorMessage = 'Login failed. Please check your User ID.';
        console.error('Login failed:', error);
      }
    );
  
 }

  toggleRegistrationFunction() {
    this.toggleRegistration.emit(); 
  }


}
