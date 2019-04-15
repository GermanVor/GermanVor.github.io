import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import  Main from './containers/Main';
//import connect from "react-redux/es/connect/connect";
//import * as postsSelectors from "./store/posts/reducer";
class App extends Component {
  render() {
    return (
      <div className="App">
            <Main/>
          <h1>-_-_-_-_-_-_-_-_-_-_-_-_</h1>
      </div>
    );
  }
}

export default connect(undefined,undefined)(App);