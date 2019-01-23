import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import axios from 'axios';
import Squares from './Squares';
import Leaders from './Leaders';
import Login from './Login';
import Signup from './Signup';
import IconTabs from './Tabs';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const user = null;

class App extends Component {
  state = {
  }

  
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/' component={IconTabs}  />
            <Route path='/squares' component={Squares}  />
            <Route path='/leaders' component={Leaders} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </div>
        </Router>
      </div>
    );
  }
}

const styles = {

}

export default App;
