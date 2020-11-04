import React from "react";
import Login from "./LoginOrRegister";
import Profile from "./Profile";
const User = ({ to }) => {
  switch (to) {
    case 0:
      return <Login isLogin={true} />;
    case 1:
      return <Login isLogin={false} />;
    case 2:
      return <Profile />;
    default:
      return <Login />;
  }
};

export default User;
