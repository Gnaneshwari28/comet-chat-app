import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component'; 
import { CometChat } from '@cometchat-pro/chat';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

// Initialize Firebase
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    
  ]
}) .then(() => {
  const appID = '265198a1e5c54057';
  const region = 'in';

  const appSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  return CometChat.init(appID, appSettings);
}).then(() => {
  console.log('CometChat initialized successfully');
}).catch(error => {
  console.error('Initialization failed', error);
});
