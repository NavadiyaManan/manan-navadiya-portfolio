import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app!: FirebaseApp;
  private db!: Firestore;
  private analytics?: Analytics;

  private firebaseConfig = {
    apiKey: "AIzaSyCsEYlKAt4P9CR7AoHT8G1ta3pyJXiLy6U",
    authDomain: "manan-navadiya-portfolio.firebaseapp.com",
    projectId: "manan-navadiya-portfolio",
    storageBucket: "manan-navadiya-portfolio.firebasestorage.app",
    messagingSenderId: "942011801089",
    appId: "1:942011801089:web:4d072a919093fe62d8ea00",
    measurementId: "G-EQK0XEYN6N"
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize Firebase in the browser environment to avoid SSR failures
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
        this.analytics = getAnalytics(this.app);
        console.log("Firebase initialized successfully in browser.");
      } catch (error) {
        console.error("Firebase initialization failed:", error);
      }
    }
  }

  /**
   * Save contact submission to Cloud Firestore
   */
  async submitContact(data: { name: string; email: string; subject: string; message: string }) {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error("Cannot write to database during Server-Side Rendering");
    }

    if (!this.db) {
      throw new Error("Firestore database is not initialized");
    }

    const timestamp = new Date();

    // 1. Store in contacts collection (for your database records)
    const contactRef = await addDoc(collection(this.db, 'contacts'), {
      ...data,
      timestamp: timestamp
    });

    // 2. Send email via Web3Forms (No Firebase extensions or SMTP settings needed)
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '19113521-bf98-4088-993f-491b79556331',
          name: data.name,
          email: data.email,
          subject: `New Portfolio Message: ${data.subject}`,
          message: data.message
        })
      });

      const result = await response.json();
      if (!result.success) {
        console.warn("Web3Forms email delivery reported failure:", result);
      }
    } catch (emailError) {
      console.warn("Failed to send email via Web3Forms:", emailError);
      // We don't fail the entire submission if only the email delivery fails
    }

    return contactRef;
  }
}
