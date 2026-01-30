/**
 * Firebase Configuration
 * ----------------------
 */
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAGlAdxnnZ_d0cehFMhexaXQQeYIFk4DZU",
    authDomain: "meditasiapp.firebaseapp.com",
    projectId: "meditasiapp",
    storageBucket: "meditasiapp.firebasestorage.app",
    messagingSenderId: "584555386244",
    appId: "1:584555386244:web:a810435970a65900b279d1",
    measurementId: "G-BS1TZQEXWL"
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
    try {
        app = initializeApp(firebaseConfig);
        // Initialize Auth with React Native persistence explicitly
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } catch (e) {
        console.error("Firebase initialization failed:", e);
        // Fallback if needed but initialization usually works here
        // In case initializeAuth fails, try getAuth as backup
        if (!auth) auth = getAuth(app!);
    }
} else {
    app = getApp();
    // On hot reload, auth persistence might need re-initialization or simply retrieval
    try {
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } catch (e: any) {
        // If auth instance already exists (common in hot reload), just retrieve it
        // Using require to avoid top-level getAuth if possible
        auth = getAuth(app);
    }
}

export { app, auth, firebaseConfig };
