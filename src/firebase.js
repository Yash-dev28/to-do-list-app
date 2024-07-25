// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBe1Nq-JKiFl8iueHjyXPEhCK5I684wLM8",
    authDomain: "todo-app-5ad9a.firebaseapp.com",
    projectId: "todo-app-5ad9a",
    storageBucket: "todo-app-5ad9a.appspot.com",
    messagingSenderId: "176183480277",
    appId: "1:176183480277:web:04168b3b37e9eb5490775c",
    measurementId: "G-B0C4ECZCV7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

console.log('Firebase configuration:', firebaseConfig);
console.log('Firestore DB:', db);
console.log('Auth current user:', auth.currentUser);

export { auth, db };
