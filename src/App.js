import React from "react";
import { connect } from "react-redux";
import AppRouter from './container/AppRouter'
import './App.css'

function App(props) {
  return (
    <div className="App">
        <AppRouter/>
    </div>
  );
}
const mapStateToProps = (state) => ({
  number: state.root.number,
});

const appConnect = connect(mapStateToProps)(App);
export default appConnect;
