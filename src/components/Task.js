import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import styled from 'styled-components';

const TaskContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
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
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        const tasksRef = collection(db, 'users', user.uid, 'toDoLists', list.id, 'tasks');
        const snapshot = await getDocs(tasksRef);
        const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      }
    };
    fetchTasks();
  }, [list.id]);

  const addTask = async () => {
    const user = auth.currentUser;
    if (user && newTask.trim()) {
      const tasksRef = collection(db, 'users', user.uid, 'toDoLists', list.id, 'tasks');
      await addDoc(tasksRef, { name: newTask });
      setNewTask('');
      const snapshot = await getDocs(tasksRef);
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    }
  };

  return (
    <TaskContainer>
      <h3>{list.name}</h3>
      <div>
        {tasks.map(task => (
          <div key={task.id}>{task.name}</div>
        ))}
      </div>
      <InputContainer>
        <Input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New Task" 
        />
        <Button onClick={addTask}>Add Task</Button>
      </InputContainer>
    </TaskContainer>
  );
};

export default Task;
