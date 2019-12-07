import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import  Main from './containers/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
              <Main/> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      _exit : state.isExit 
  };
}
function mapDispatchToProps (dispatch){
  return {
      exit : () => {
          dispatch( { type : "EXIT" } )
      }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )(App);