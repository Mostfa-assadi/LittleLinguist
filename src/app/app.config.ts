import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"little-linguist-9d4f1","appId":"1:159330176465:web:20d83cf82687f13ddca4f0","storageBucket":"little-linguist-9d4f1.appspot.com","apiKey":"AIzaSyAVhLzWpmgeyITRcLWymOH_qTL-s-vZack","authDomain":"little-linguist-9d4f1.firebaseapp.com","messagingSenderId":"159330176465"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"little-linguist-9d4f1","appId":"1:159330176465:web:20d83cf82687f13ddca4f0","storageBucket":"little-linguist-9d4f1.appspot.com","apiKey":"AIzaSyAVhLzWpmgeyITRcLWymOH_qTL-s-vZack","authDomain":"little-linguist-9d4f1.firebaseapp.com","messagingSenderId":"159330176465"})), provideFirestore(() => getFirestore())]
};
