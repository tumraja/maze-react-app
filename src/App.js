import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Game } from "./+pony/components/Game";
import { Home } from "./+pony/components/home/Home";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
  );
}

export default App;
