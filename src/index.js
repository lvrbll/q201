import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main_styles/index.css';
import App from './main/App.jsx';
import './styles/main_styles/variables.css'
import './styles/main_styles/reset.css'
import { BrowserRouter } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);