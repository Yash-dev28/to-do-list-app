import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ToDoList = () => {
  const [toDoLists, setToDoLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const fetchToDoLists = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const toDoListsRef = collection(db, 'users', user.uid, 'toDoLists');
          const snapshot = await getDocs(toDoListsRef);
          const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setToDoLists(lists);
        }
      } catch (error) {
        console.error('Error fetching to-do lists:', error);
      }
    };
    fetchToDoLists();
  }, []);

  const addToDoList = async () => {
    try {
      const user = auth.currentUser;
      if (user && newListName.trim()) {
        const toDoListsRef = collection(db, 'users', user.uid, 'toDoLists');
        await addDoc(toDoListsRef, { name: newListName });
        setNewListName('');
        const snapshot = await getDocs(toDoListsRef);
        const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setToDoLists(lists);
      }
    } catch (error) {
      console.error('Error adding to-do list:', error);
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
