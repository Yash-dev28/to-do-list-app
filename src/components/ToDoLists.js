// src/components/ToDoList.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
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
      const user = auth.currentUser;
      console.log('Auth current user:', user);

      if (user) {
        try {
          console.log('Fetching to-do lists for user:', user.uid);
          const userDocRef = doc(db, 'users', user.uid);
          const toDoListsRef = collection(userDocRef, 'toDoLists');
          console.log('ToDoLists Reference:', toDoListsRef);
          const snapshot = await getDocs(toDoListsRef);
          const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setToDoLists(lists);
        } catch (error) {
          console.error("Error fetching to-do lists: ", error);
        }
      }
    };
    fetchToDoLists();
  }, []);

  const addToDoList = async () => {
    const user = auth.currentUser;
    console.log('Auth current user on add:', user);

    if (user && newListName.trim()) {
      try {
        console.log('Adding new to-do list for user:', user.uid);
        const userDocRef = doc(db, 'users', user.uid);
        const toDoListsRef = collection(userDocRef, 'toDoLists');
        console.log('ToDoLists Reference on add:', toDoListsRef);
        await addDoc(toDoListsRef, { name: newListName });
        setNewListName('');
        const snapshot = await getDocs(toDoListsRef);
        const lists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setToDoLists(lists);
      } catch (error) {
        console.error("Error adding new to-do list: ", error);
      }
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
