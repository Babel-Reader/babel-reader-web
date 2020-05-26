import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/home/Home";
import Reading from "./pages/reading/Reading";

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
