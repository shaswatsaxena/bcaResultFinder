import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import SearchFormName from "./components/SearchFormName";
import Result from "./components/Result";
import NotFound from "./components/NotFound";
import StudentGrid from "./components/StudentGrid";

export default props => (
  <Router>
    <Main />
    <Switch>
      <Route exact path="/" component={SearchFormName} />
      <Route
        exact
        path="/results/2019/1"
        render={props => <StudentGrid {...props} year={2019} semester={1} />}
      />
      <Route
        exact
        path="/results/2018/3"
        render={props => <StudentGrid {...props} year={2018} semester={3} />}
      />
      <Route
        exact
        path="/results/2018/2"
        render={props => <StudentGrid {...props} year={2018} semester={2} />}
      />
      <Route
        exact
        path="/results/2018/1"
        render={props => <StudentGrid {...props} year={2018} semester={1} />}
      />
      <Route
        exact
        path="/results/2017/5"
        render={props => <StudentGrid {...props} year={2017} semester={5} />}
      />
      <Route
        exact
        path="/results/2017/4"
        render={props => <StudentGrid {...props} year={2017} semester={4} />}
      />
      <Route
        exact
        path="/results/2017/3"
        render={props => <StudentGrid {...props} year={2017} semester={3} />}
      />
      <Route
        exact
        path="/results/2016/6"
        render={props => <StudentGrid {...props} year={2016} semester={6} />}
      />
      <Route
        exact
        path="/results/2016/5"
        render={props => <StudentGrid {...props} year={2016} semester={5} />}
      />
      <Route path="/result/:year/:query/:semester" component={Result} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
