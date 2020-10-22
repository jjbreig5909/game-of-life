import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "./components/Grid.js";
import Header from "./components/Header.js";
import Rules from "./components/Rules.js";
import Bio from "./components/Bio.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path ="/" component ={Grid} />
          <Route exact path ="/bio" component ={Bio} />
          <Route exact path ="/rules" component ={Rules} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
