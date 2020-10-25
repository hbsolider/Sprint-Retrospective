import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../container/Dashboard";
import Header from "../container/Header";

export default function AppRouter() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}
