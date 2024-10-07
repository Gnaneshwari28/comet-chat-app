import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router'; 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from "./chat/chat.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule, LoginComponent, RegisterComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comet-chat-app';
  constructor() { }

  
}
