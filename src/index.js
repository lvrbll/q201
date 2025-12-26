import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main_styles/index.css';
import App from './main/App.jsx';
import './styles/main_styles/variables.css'
import './styles/main_styles/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);