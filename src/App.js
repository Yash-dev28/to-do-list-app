import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './App.css'; // Ensure you have the CSS file to style your components

const firebaseConfig = {
  apiKey: "AIzaSyBe1Nq-JKiFl8iueHjyXPEhCK5I684wLM8",
  authDomain: "todo-app-5ad9a.firebaseapp.com",
  projectId: "todo-app-5ad9a",
  storageBucket: "todo-app-5ad9a.appspot.com",
  messagingSenderId: "176183480277",
  appId: "1:176183480277:web:04168b3b37e9eb5490775c",
  measurementId: "G-B0C4ECZCV7"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-in User:", user);
      window.location.href = '/ToDoApp/index.html';
    } catch (error) {
      console.error("Google Sign-in Error:", error.code, error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !fullName || !password) {
      setErrorMsg("Please fill all the required fields");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Sign-up User:", user);
      window.location.href = '/ToDoApp/index.html';
    } catch (error) {
      console.error("Sign-up Error:", error.code, error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill all the required fields");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login User:", user);
      window.location.href = '/ToDoApp/index.html';
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Manage all your daily tasks with ease with Taskify!</h1>
      <img src="path/to/task-image.jpg" alt="Task" />
      {isCreatingAccount ? (
        <div>
          <h2>Create new account</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Get Started'}
            </button>
            {errorMsg && <p id="error">{errorMsg}</p>}
          </form>
          <button onClick={() => setIsCreatingAccount(false)} disabled={loading}>
            Back
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsCreatingAccount(true)} disabled={loading}>
            Create new account
          </button>
          <button id="googleAuth" onClick={handleGoogleAuth} disabled={loading}>
            {loading ? 'Loading...' : 'Sign in with Google'}
          </button>
          <form onSubmit={handleLogin}>
            <h2>Sign in to use Taskify</h2>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            {errorMsg && <p id="error">{errorMsg}</p>}
          </form>
        </div>
      )}
      <p>By signing up you are agreeing to our Terms and Conditions</p>
      <img src="path/to/check-image.jpg" alt="Check" id="check" />
    </div>
  );
}

export default App;
