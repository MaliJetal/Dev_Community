import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
//import App from './App.js';
import reportWebVitals from './reportWebVitals';
import store from './store';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();