import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
