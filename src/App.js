import React from "react";
import Email from "./components/Email";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmailEditorComponent from "./components/Edit";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/edit" component={EmailEditorComponent} />
        </Switch>
        <Switch>
          <Route exact path="/create" component={Email} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
