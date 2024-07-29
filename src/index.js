// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import GlobalStyle from './globalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <GlobalStyle /> */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
