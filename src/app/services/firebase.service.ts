import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBC5SCMhufZ7D7vvUvV2Su83Y9-rCW8fN8',
      authDomain: 'salutem-app-fitness.firebaseapp.com',
      databaseURL: 'https://salutem-app-fitness-default-rtdb.firebaseio.com',
      projectId: 'salutem-app-fitness',
      storageBucket: 'salutem-app-fitness.firebasestorage.app',
      messagingSenderId: '11928911269',
      appId: '1:11928911269:web:54dcf2c20b5828c325fc4c',
      measurementId: 'G-GZJ22QH82B',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
