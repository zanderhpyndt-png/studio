
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

export function initializeFirebase() {
  if (typeof window === 'undefined') return { app: null, auth: null, db: null };

  if (getApps().length > 0) {
    app = getApp();
  } else {
    // Check if we have a valid API Key to prevent crashing with auth/invalid-api-key
    if (firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5) {
      try {
        app = initializeApp(firebaseConfig);
      } catch (e) {
        console.error("Firebase initialization failed:", e);
      }
    } else {
      console.warn("Firebase API Key is missing. Check your Environment Variables in App Hosting.");
    }
  }

  if (app) {
    try {
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (e) {
      console.error("Error initializing Firebase services:", e);
    }
  }

  return { 
    app: app || null, 
    auth: auth || null, 
    db: db || null 
  };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
