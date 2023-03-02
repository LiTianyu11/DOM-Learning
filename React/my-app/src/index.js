import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


function one(){
  return (
    <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
    </div>
  )
}

function two(){
  return (
    <div>
      <h1>header</h1>
      <p>demo</p>
      <p>demo</p>
    </div>
   
  )
}

function three(){
  return (
    
    <div>
      <input type="button" />
      <input type="text" />
    </div>
   

  )
}