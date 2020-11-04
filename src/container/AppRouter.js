import React from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";
import Dashboard from "../container/Dashboard";
import Header from "../container/Header";
import User from "../container/User";
import Board from "../container/Board";
import { connect } from "react-redux";
import Navbar from "./Navbar";
function AppRouter(props) {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
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
          path= "/user/profile"
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
        <Route path="*" render={()=>{
          return "Not found"
        }}/>
      </Switch>
    </HashRouter>
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
          <Redirect to= "/user" />
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
