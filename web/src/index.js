import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './Home';
import Item from './Item';
import Checkout from './Checkout';

import Login from './Login';
import Signup from './Signup';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/item/:itemId" component={Item}/>
      <Route exact path="/checkout" component={Checkout}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
    </div>
  </Router>,
 document.getElementById('root')
);


serviceWorker.unregister();
