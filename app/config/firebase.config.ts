import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: 'AIzaSyCn7CyxdKldlUnPU9gJ_OzmRW4AU1WI5-Q',
  authDomain: 'swivel-event-planner.firebaseapp.com',
  projectId: 'swivel-event-planner',
  storageBucket: 'swivel-event-planner.appspot.com',
  messagingSenderId: '759002095689',
  appId: '1:759002095689:web:f7521334c30f2f1b8a9f98',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Cloud Storage
const storage = getStorage(app);

export {app, auth, db, storage}