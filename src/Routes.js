import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import SearchForm from "./components/SearchForm";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

export default props => (
  <Router>
    <Main />
    <Switch>
      <Route exact path="/" component={SearchForm} />
      <Route path="/result/:year/:rollNumber/:semester" component={Result} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
