import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 70%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ToDoList = () => {
  const [toDoLists, setToDoLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const fetchToDoLists = async () => {
      const user = auth.currentUser;
      if (user) {
        const toDoListsRef = collection(db, 'users', user.uid, 'toDoLists');
        const snapshot = await getDocs(toDoListsRef);
        const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setToDoLists(lists);
      }
    };
    fetchToDoLists();
  }, []);

  const addToDoList = async () => {
    const user = auth.currentUser;
    if (user && newListName.trim()) {
      const toDoListsRef = collection(db, 'users', user.uid, 'toDoLists');
      await addDoc(toDoListsRef, { name: newListName });
      setNewListName('');
      const snapshot = await getDocs(toDoListsRef);
      const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setToDoLists(lists);
    }
  };

  return (
    <Container>
      <h2>To-Do Lists</h2>
      <div>
        <Input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
        />
        <Button onClick={addToDoList}>Add List</Button>
      </div>
      <div>
        {toDoLists.map(list => (
          <Task key={list.id} list={list} />
        ))}
      </div>
    </Container>
  );
};

export default ToDoList;
