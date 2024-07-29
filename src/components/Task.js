import React from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Task = ({ list }) => {
  return (
    <TaskContainer>
      <h3>{list.name}</h3>
      {/* Add more details or functionality for tasks here */}
    </TaskContainer>
  );
};

export default Task;
