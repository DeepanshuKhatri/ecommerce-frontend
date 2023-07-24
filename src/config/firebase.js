// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4HXIhYkzmsRHXVvakZA_qF5R7Hfuqu6I",
  authDomain: "newsocialmediaapp-9e5ee.firebaseapp.com",
  projectId: "newsocialmediaapp-9e5ee",
  storageBucket: "newsocialmediaapp-9e5ee.appspot.com",
  messagingSenderId: "961909740103",
  appId: "1:961909740103:web:2adf2d0bce895c951cd762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);