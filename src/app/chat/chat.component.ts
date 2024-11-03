import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../environments/environment';
import { CallingExtension, CometChatContacts, CometChatConversationsWithMessages, CometChatGroupsWithMessages, CometChatTabs, CometChatUsersWithMessages } from '@cometchat/chat-uikit-angular';

import { BaseStyle } from "@cometchat/uikit-elements";
import { TabItemStyle } from "@cometchat/uikit-shared";
import { CometChatTabItem } from "@cometchat/chat-uikit-angular";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule,CometChatContacts, CometChatConversationsWithMessages,
    CometChatGroupsWithMessages,CometChatTabs,
    CometChatUsersWithMessages,],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
tabsStyle!: BaseStyle;


  userList: any[] = []; // Store list of users
  selectedUser: any;
  message: string = '';
  messages: any[] = []; // Store messages
  apiKey = environment.comet.apiKey; // Your CometChat API key
  userId: any;

  // @ViewChild('callView', { static: false }) callView!: ElementRef;
  @ViewChild('callContainer') callContainer!: ElementRef; 

  constructor() {}

  ngOnInit() {
    this.fetchUserList();
    this.addMessageListener();
  }

  fetchUserList() {
    // Fetch user list using CometChat UserRequestBuilder
    const userRequest = new CometChat.UsersRequestBuilder()
      .setLimit(30) 
      .build();

    userRequest.fetchNext().then(
      userList => {
        this.userList = userList; 
      },
      error => {
        console.error('Error fetching user list:', error);
      }
    );
  }

  addMessageListener() {
    CometChat.addMessageListener(
      "UNIQUE_LISTENER_ID",
      new CometChat.MessageListener({
        onTextMessageReceived: (message:any) => {
          console.log("New message received:", message);
          this.messages.push(message); // Push received message to the message list
        }
      })
    );
  }

  selectUser(user: any) {
    // this.selectedUser = user;
    // this.fetchMessages(); // Fetch messages when a user is selected
    CometChat.getUser(user.uid).then(
      updatedUser => {
        this.selectedUser = updatedUser;
        this.fetchMessages();
      },
      error => {
        console.error("Error fetching user details:", error);
      }
    );
  }

  fetchMessages() {
    if (!this.selectedUser) return;

    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setUID(this.selectedUser.uid)
      .setLimit(3000) // Fetch the last 30 messages
      .build();

    messageRequest.fetchPrevious().then(
      messages => {
        this.messages = messages; // Populate the messages array
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage() {
    console.log(this.selectedUser, this.message)
    if (!this.selectedUser || !this.message) return;

    const textMessage = new CometChat.TextMessage(
      this.selectedUser.uid,
      this.message,
      CometChat.RECEIVER_TYPE.USER
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        this.messages.push(message); // Add the sent message to the messages array
        this.message = ''; // Clear input
      },
      error => {
        console.error('Message sending failed:', error);
      }
    );
  }



// startAudioCall(receiverUid:any) {
 
//   const currentUser = this.userId;
 
//   const callSettings = new CometChat.CallSettingsBuilder() 
//     .setSessionID(this.generateUniqueSessionId()) 
//     .setIsAudioOnlyCall(true) 
//     .setUser(currentUser)
//     .build(); 


//   const callListener = new CometChat.OngoingCallListener({
//     onUserJoined: (user:any) => {
//       console.log('User joined the call:', user);
//     },
//     onUserLeft: (user:any) => {
//       console.log('User left the call:', user);
//     },
//   });

//   // 4. Initiate Call
//   CometChat.initiateCall({
//     receiverId: receiverUid, 
//     receiverType: CometChat.RECEIVER_TYPE.USER, 
//     callType: CometChat.CALL_TYPE.AUDIO,
//     callSettings: callSettings 
//   })
//   .then((call) => {
    
//     CometChat.startCall(callSettings, this.callContainer.nativeElement, callListener); 
//   })
//   .catch((error) => {
   
//     console.error("Error initiating call:", error);
    
//   });
// }


startAudioCall(receiverUid: string) {
  if (!this.selectedUser) {
    console.error("No user selected for the call.");
    return;
  }

  const audioCall = new CometChat.Call(receiverUid, CometChat.CALL_TYPE.AUDIO, CometChat.RECEIVER_TYPE.USER);

  CometChat.initiateCall(audioCall).then(
    (outgoingCall) => {
      CometChat.startCall(outgoingCall.getSessionId(), this.callContainer.nativeElement, new CometChat.OngoingCallListener({
        onUserJoined: (user: any) => console.log("User joined call:", user),
        onUserLeft: (user:any) => console.log("User left call:", user),
        onCallEnded: (call:any) => console.log("Call ended:", call)
      }));
    },
    error => {
      console.error("Error initiating call:", error);
    }
  );
}


// Helper Function (Replace with your preferred method)
generateUniqueSessionId() {
  return Math.random().toString(36).substr(2, 9); 
}



 
}