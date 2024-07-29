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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };
