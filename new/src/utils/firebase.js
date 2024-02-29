// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
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

export const auth = getAuth()
export const db = getFirestore(app)