// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import ToDoList from './components/ToDoList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/todolist" element={<ToDoList />} />
    </Routes>
  );
};

export default App;
