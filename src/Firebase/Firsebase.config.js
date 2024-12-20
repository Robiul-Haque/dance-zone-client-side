// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_local_apiKey,
    authDomain: import.meta.env.VITE_local_authDomain,
    projectId: import.meta.env.VITE_local_projectId,
    storageBucket: import.meta.env.VITE_local_storageBucket,
    messagingSenderId: import.meta.VITE_local_messagingSenderId,
    appId: import.meta.env.VITE_local_appId,
    // measurementId: import.meta.VITE_local_measurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
// const analytics = getAnalytics(app);