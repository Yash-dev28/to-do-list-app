import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Welcome to the To-Do List App</Title>
      <Button to="/login">Get Started</Button>
    </Container>
  );
};

export default Home;
