// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import LandingPage from './components/LandingPage';
import ToDoList from './components/ToDoLists';
import GlobalStyle from './GlobalStyle';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <GlobalStyle />
      {user ? (
        <ToDoList />
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
