import React, { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "../container/Dashboard";
import User from "../container/User";
import Board from "../container/Board";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import UserAction from "../redux/User/User.action";
function AppRouter(props) {
  useEffect(props.getUser, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/user"
          render={() => {
            return <User to={0} />;
          }}
        />
        <Route
          exact
          path="/user/register"
          render={() => {
            return <User to={1} />;
          }}
        />
        <ProtectedRoute
          exact
          path="/user/profile"
          Component={User}
          to={2}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path="/"
          Component={Dashboard}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          Component={Dashboard}
          haveHeader={true}
          {...props}
        />
        <ProtectedRoute
          exact
          path="/board/:boardId?"
          Component={Board}
          haveHeader={false}
          inMain={false}
          {...props}
        />
        <Route
          path="*"
          render={() => {
            return "Not found";
          }}
        />
      </Switch>
    </BrowserRouter>
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
                <Component to={to} {...props} />
              </div>
            ) : (
              <Component {...props} to={to} />
            )}
          </>
        ) : (
          <Redirect to="/user" />
        );
      }}
      {...rest}
    />
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => {
      dispatch(UserAction.getUser2());
    },
  };
};
const appConnect = connect(mapStateToProps, mapDispatchToProps)(AppRouter);
export default appConnect;
