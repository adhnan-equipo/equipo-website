// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, serverTimestamp, set } from 'firebase/database';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase with connection logging
const initFirebase = () => {
  if (!getApps().length) {
    try {
      console.log("📡 Initializing Firebase connection...");
      const app = initializeApp(firebaseConfig);
      
      const database = getDatabase(app);
      
      // Create a reference to test connection status
      const connectedRef = ref(database, '.info/connected');
      
      // Test and log connection status
      onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          console.log("✅ Firebase connection established");
          
          // Log connection status to database if in production
          if (process.env.NODE_ENV === 'production') {
            const connectionLogRef = ref(database, 'connection_logs/web');
            set(connectionLogRef, {
              timestamp: serverTimestamp(),
              status: 'connected',
              environment: process.env.NODE_ENV,
              client: 'web'
            }).catch(error => {
              console.error("❌ Error logging connection:", error);
            });
          }
        } else {
          console.warn("⚠️ Firebase connection lost");
        }
      }, (error) => {
        console.error("❌ Firebase connection error:", error);
      });
      
      // Initialize Analytics conditionally (client-side only)
      if (typeof window !== 'undefined') {
        isSupported().then(supported => {
          if (supported) {
            getAnalytics(app);
            console.log("📊 Firebase Analytics initialized");
          } else {
            console.log("⚠️ Firebase Analytics not supported in this environment");
          }
        }).catch(error => {
          console.error("❌ Error initializing Firebase Analytics:", error);
        });
      }
      
      return app;
    } catch (error) {
      console.error("❌ Firebase initialization failed:", error);
      throw error; // Re-throw to allow app to handle this critical error
    }
  }
  return getApps()[0];
};

export const app = initFirebase();
export const db = getDatabase(app);

// Export helper function to check connection status programmatically
export const checkFirebaseConnection = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const connectedRef = ref(db, '.info/connected');
      const unsubscribe = onValue(connectedRef, (snap) => {
        unsubscribe(); // Only check once
        resolve(snap.val() === true);
      }, (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};