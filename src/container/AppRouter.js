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
        <Route
          exact
          path={process.env.PUBLIC_URL + "/user"}
          render={() => {
            return <User to={0} />;
          }}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/user/register"}
          render={() => {
            return <User to={1} />;
          }}
        />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/user/profile"}
          Component={User}
          to={2}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/"}
          Component={Dashboard}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/dashboard"}
          Component={Dashboard}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + "/board/:boardId?"}
          Component={Board}
          haveHeader={false}
          inMain={false}
          {...props}
        />
      </Switch>
    </Router>
  );
}

const ProtectedRoute = ({
  Component,
  user,
  path,
  haveHeader,
  inMain = true,
  to = null,
  ...rest
}) => {
  return (
    <Route
      path={path}
      render={(props) => {
        return user.loggedIn ? (
          <>
            {inMain ? (
              <div className="main">
                {haveHeader && <Header />}
                <Component to={to} {...props} />
              </div>
            ) : (
              <Component {...props} to={to} />
            )}
          </>
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
