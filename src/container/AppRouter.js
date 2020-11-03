import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../container/Dashboard";
import Header from "../container/Header";
import User from "../container/User";
import Board from "../container/Board";
import { connect } from "react-redux";
import Navbar from "./Navbar";
function AppRouter(props) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/user"} component={User} />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/"}
          Component={Dashboard}
          {...props}
        />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/dashboard"}
          Component={Dashboard}
          {...props}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/board/:boardId?"}
          render={(props) => {
            return <Board {...props} title={props.location.state.title} />;
          }}
        />
      </Switch>
    </Router>
  );
}

const ProtectedRoute = ({ Component, user, path, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) => {
        return user.loggedIn ? (
          <div className="main">
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={process.env.PUBLIC_URL + "/user"} />
        );
      }}
      {...rest}
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

const appConnect = connect(mapStateToProps)(AppRouter);
export default appConnect;
