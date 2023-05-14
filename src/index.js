import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/Navbar.css';
import "./styles/App.css";
import "./styles/AppointmentApp.css";
import './styles/index.css';
import './styles/Home.css';
import './styles/Services.css';
import './styles/Team.css';
import './styles/Contact.css';
import './styles/Delete.css';
import './i18n/config';
import { BrowserRouter } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
