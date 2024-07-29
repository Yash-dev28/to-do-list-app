import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: calc(100% - 120px);
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Task = ({ list }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = async () => {
    if (taskName.trim()) {
      try {
        const tasksRef = collection(db, 'users', list.id, 'tasks');
        await addDoc(tasksRef, { name: taskName });
        setTaskName('');
        console.log('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <Container>
      <h3>{list.name}</h3>
      <Input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="New Task"
      />
      <Button onClick={handleAddTask}>Add Task</Button>
    </Container>
  );
};

export default Task;
