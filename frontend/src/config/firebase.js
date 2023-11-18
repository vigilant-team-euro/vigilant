// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxDTNJ-jV6_ln3tSCyASYYacMcESgZtRk",
  authDomain: "vigilant-36758.firebaseapp.com",
  projectId: "vigilant-36758",
  storageBucket: "vigilant-36758.appspot.com",
  messagingSenderId: "14332637896",
  appId: "1:14332637896:web:7e53a790a003cb2204abfd",
  measurementId: "G-K0GKXG9BX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const db = getFirestore(app)