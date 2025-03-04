import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppState from "./context/AppState.jsx";

createRoot(document.getElementById("root")).render(
  <AppState>
    <App />
  </AppState>
);









// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
