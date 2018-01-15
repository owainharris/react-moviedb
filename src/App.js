/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import MoviesList from './components/MoviesList';
import MovieDetail from './components/MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Route exact path="/" component={MoviesList} />
      <Route path="/:id" component={MovieDetail} />
    </div>
  </Router>
);

export default App;
