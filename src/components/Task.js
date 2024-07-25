// src/components/Task.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

const ItemTypes = {
  TASK: 'task',
};

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-top: 20px;
`;

const TaskInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: block;
`;

const TaskButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  &:hover {
    background-color: #218838;
  }
`;

const TaskContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  cursor: move;
`;

const Task = ({ list }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        const tasksRef = db.collection('users').doc(user.uid).collection('toDoLists').doc(list.id).collection('tasks');
        const snapshot = await tasksRef.get();
        const tasksList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksList);
      }
    };
    fetchTasks();
  }, [list.id]);

  const addTask = async () => {
    const user = auth.currentUser;
    if (user && newTask.title.trim()) {
      const tasksRef = db.collection('users').doc(user.uid).collection('toDoLists').doc(list.id).collection('tasks');
      await tasksRef.add(newTask);
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
      const snapshot = await tasksRef.get();
      const tasksList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksList);
    }
  };

  const moveTask = (draggedTask, hoverTaskId) => {
    const dragIndex = tasks.findIndex(task => task.id === draggedTask.id);
    const hoverIndex = tasks.findIndex(task => task.id === hoverTaskId);
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <h3>{list.name}</h3>
        <TaskInput 
          type="text" 
          value={newTask.title} 
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
          placeholder="Task Title" 
        />
        <TaskInput 
          type="text" 
          value={newTask.description} 
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          placeholder="Task Description" 
        />
        <TaskInput 
          type="date" 
          value={newTask.dueDate} 
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
          placeholder="Task Due Date" 
        />
        <TaskInput 
          type="text" 
          value={newTask.priority} 
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} 
          placeholder="Task Priority" 
        />
        <TaskButton onClick={addTask}>Add Task</TaskButton>
        <div>
          {tasks.map(task => (
            <DraggableTask
              key={task.id}
              task={task}
              moveTask={moveTask}
            />
          ))}
        </div>
      </Container>
    </DndProvider>
  );
};

const DraggableTask = ({ task, moveTask }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(draggedItem) {
      if (draggedItem.id !== task.id) {
        moveTask(draggedItem, task.id);
        draggedItem.id = task.id;
      }
    },
  });

  return (
    <TaskContainer ref={node => ref(drop(node))}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>{task.dueDate}</p>
      <p>{task.priority}</p>
    </TaskContainer>
  );
};

export default Task;
