// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyAFVpqDqjwcZp7Gj2n3FeYXapHd1WvgI",
  authDomain: "fire-guardian-68414.firebaseapp.com",
  projectId: "fire-guardian-68414",
  storageBucket: "fire-guardian-68414.firebasestorage.app",
  messagingSenderId: "1088129117310",
  appId: "1:1088129117310:web:77123652912a4a0dc7bc2f",
  measurementId: "G-6LR1WMYL2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);