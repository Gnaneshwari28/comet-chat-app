import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';

@NgModule({
  imports: [
    BrowserModule,
    ChatComponent,
    LoginComponent, 
    RegisterComponent,
    FormsModule,
  ],
    providers: [],
})
export class AppModule {}

