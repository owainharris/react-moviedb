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
import ShowDetail from './components/ShowDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Route exact path="/" component={MoviesList} />
      <Route exact path="/MovieDetail/:id" component={MovieDetail} />
      <Route exact path="/ShowDetail/:id" component={ShowDetail} />
    </div>
  </Router>
);

export default App;
