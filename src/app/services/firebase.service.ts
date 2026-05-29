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

    // 2. Store in mail collection (to trigger the Trigger Email from Firestore extension)
    try {
      await addDoc(collection(this.db, 'mail'), {
        to: 'man.navadiya110@gmail.com', // Your destination email
        message: {
          subject: `New Portfolio Message: ${data.subject}`,
          text: `You have received a new message from your portfolio website:\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
          html: `<p>You have received a new message from your portfolio website:</p>
                 <p><strong>Name:</strong> ${data.name}</p>
                 <p><strong>Email:</strong> ${data.email}</p>
                 <p><strong>Subject:</strong> ${data.subject}</p>
                 <p><strong>Message:</strong></p>
                 <p>${data.message.replace(/\n/g, '<br>')}</p>`
        }
      });
    } catch (mailError) {
      console.warn("Failed to write to mail trigger collection:", mailError);
      // We don't fail the submission if just the mail trigger fails
    }

    return contactRef;
  }
}
