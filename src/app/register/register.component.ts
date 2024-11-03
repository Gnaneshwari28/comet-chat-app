import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // constructor(private router: Router) {}
  
  // @Output() toggleLogin = new EventEmitter<void>();


  // userID = '';
  // name = '';
  // apiKey = environment.comet.apiKey; 
  // errorMessage = '';

  //  async onSubmit() {
  //       try {
  //         // Check if the user already exists
  //         await CometChat.getUser(this.userID);
  //         alert('User ID already exists. Please try logging in.');
  //         this.router.navigate(['/login']);
          
  //       } catch (error:any) {
  //         // If the user does not exist, proceed to create a new user
  //         if (error.code === 'ERR_UID_NOT_FOUND') {
  //           try {
  //             const newUser = new CometChat.User(this.userID);
  //             newUser.setName(this.name);
    
  //             await CometChat.createUser(newUser, this.apiKey);
  //             console.log('User created successfully');
              
  //             // Navigate to chat after successful registration
  //             // this.router.navigate(['/chat']);
  //           } catch (creationError) {
  //             console.error('Error creating user:', creationError);
  //             this.errorMessage = 'Failed to create user. Please try again.';
  //           }
  //         } else {
  //           console.error('Unexpected error:', error);
  //         this.errorMessage = 'Failed to create user. Please try again.';
  //       }

  //     }
    
   
  // }
  
  // toggleLoginFunction() {
  //   // this.toggleLogin.emit(); 
  //   this.router.navigate(['/login']);
  // }


  userID = '';
  name = '';
  apiKey = environment.comet.apiKey; 
  errorMessage = '';

  constructor(private router: Router) {}

  async onSubmit() {
    try {
      await CometChat.getUser(this.userID);
      alert('User ID already exists. Please try logging in.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      if (error.code === 'ERR_UID_NOT_FOUND') {
        try {
          const newUser = new CometChat.User(this.userID);
          newUser.setName(this.name);
          await CometChat.createUser(newUser, this.apiKey);
          console.log('User created successfully');
          // Automatically log in after registration
          await CometChat.login(this.userID, this.apiKey);
          this.router.navigate(['/chat']); // Navigate to chat component
        } catch (creationError) {
          console.error('Error creating user:', creationError);
          this.errorMessage = 'Failed to create user. Please try again.';
        }
      } else {
        console.error('Unexpected error:', error);
        this.errorMessage = 'Failed to create user. Please try again.';
      }
    }
  }

  toggleLoginFunction() {
    this.router.navigate(['/login']);
  }

}
