import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Login} from './components/Login/login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import { SignUp } from './components/Signup/signup';


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Switch> 
        <Route exact path='/home' component={App}></Route>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route> 
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
