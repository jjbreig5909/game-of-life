import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "./components/Grid.js";
import Rules from "./components/Rules.js";
import NavMenu from './components/NavMenu.js';

function App() {
  return (
    <Router>
      <div className="App">
        <NavMenu />
        <Switch>
          <Route exact path ="/" component ={Grid} />
          <Route exact path ="/about" component ={Rules} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
