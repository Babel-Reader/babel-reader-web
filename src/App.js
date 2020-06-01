import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Reading from "./components/reading/Reading";

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/read'>
          <Reading/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
