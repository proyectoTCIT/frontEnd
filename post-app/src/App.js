import React from 'react';
import './App.css';
import Posts from './components/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './components/Nav';

const App =()=>(
    <main>
      <Nav />
      <Router>
        <Route path="/" exact component={Posts} />
      </Router>
    </main> 
)

export default App;
