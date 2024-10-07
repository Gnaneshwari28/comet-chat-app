import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private router: Router) {}
  
  @Output() toggleLogin = new EventEmitter<void>();


  userID = '';
  name = '';
  apiKey = '14a2d2e74bd7dcf66d0591b630bab73261f79e88'; 
  errorMessage = '';

   onSubmit() {
          
        // Create a new user using CometChat
        const newUser = new CometChat.User(this.userID);
        newUser.setName(this.name);

        const user =  CometChat.createUser(newUser, this.apiKey);
        console.log('User created successfully:', user);
        this.router.navigate(['/chat']);
    
   
  }
  
  

  toggleLoginFunction() {
    this.toggleLogin.emit(); 
  }


}
