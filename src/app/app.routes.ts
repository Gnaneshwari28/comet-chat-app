import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login',component:LoginComponent},
    { path: 'register',component:RegisterComponent },
    { path: 'chat', component:ChatComponent },
    // { path: '**', redirectTo: 'login' }
  ];

