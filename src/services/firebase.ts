// Fallback to Compat API which is often more stable in mixed environments
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Import Firestore
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyAGlAdxnnZ_d0cehFMhexaXQQeYIFk4DZU",
    authDomain: "meditasiapp.firebaseapp.com",
    projectId: "meditasiapp",
    storageBucket: "meditasiapp.firebasestorage.app",
    messagingSenderId: "584555386244",
    appId: "1:584555386244:web:a810435970a65900b279d1",
    measurementId: "G-BS1TZQEXWL"
};

let app: firebase.app.App;
let auth: firebase.auth.Auth; // Compat Auth type
let db: firebase.firestore.Firestore;

try {
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
        console.log("Firebase Compat App initialized");
    } else {
        app = firebase.app();
        console.log("Firebase Compat App retrieved");
    }

    // Initialize Auth with persistence using Compat API
    // The compat API typically handles side-effects/registration internally better
    auth = firebase.auth();
    // Verify persistence (optional, compat usually defaults to local in RN if installed)
    console.log("Firebase Compat Auth initialized");

    // Initialize Firestore for User Progress/Stats
    db = firebase.firestore();
    console.log("Firebase Compat Firestore initialized");

    // Initialize Storage (if needed for profile pics etc)
    // storage = firebase.storage();


} catch (e: any) {
    console.error("Firebase Compat Init Error:", e);
    setTimeout(() => {
        Alert.alert("Firebase Error", e.message);
    }, 1000);
}

// Wrapper to match previous getFirebaseAuth interface, or we can just export auth
// The previous code expected a Modular Auth instance, but Compat Auth is slightly different.
// However, most methods (signInWith...) are compatible if we import from compat/auth in Context.
// Wrapped getters/exports
export const getFirebaseAuth = () => auth;
export const getFirestore = () => db;

export { app, db, auth, firebaseConfig };
