// src/components/LandingPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f9f9f9;
`;

const Header = styled.header`
  width: 100%;
  background: #007bff;
  padding: 10px 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Header>
        <h1>To-Do App</h1>
      </Header>
      <Main>
        {isLogin ? (
          <>
            <h2>Login</h2>
            <Login />
            <ToggleButton onClick={() => setIsLogin(false)}>
              New user? Sign Up
            </ToggleButton>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <SignUp />
            <ToggleButton onClick={() => setIsLogin(true)}>
              Already have an account? Login
            </ToggleButton>
          </>
        )}
      </Main>
    </Container>
  );
};

export default LandingPage;
