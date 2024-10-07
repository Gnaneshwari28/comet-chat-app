import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { Firestore, collection, getDocs, getFirestore } from '@angular/fire/firestore';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
 
  messages: any[] = [];
  currentUserId: string | null = null; // Dynamic user ID
  chatWithUserId: string = ''; // This will be set dynamically based on selection
  messageText: string = ''; // Added to store message input

  constructor() {}

  ngOnInit() {
  }

  

}