import React from "react";
import { connect } from "react-redux";
import Navbar from "./container/Navbar";
import AppRouter from './container/AppRouter'
import './App.css'
function App(props) {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <AppRouter/>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  number: state.root.number,
});

const appConnect = connect(mapStateToProps)(App);
export default appConnect;
