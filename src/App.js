import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import  Main from './containers/Main';
import {
  Home,
  About,
  Contact,
  Whoops404
} from './components/mapMenu';
import {
  HashRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom';
const logo = require('./style/me.jpg');

class App extends Component {
  render() {
    return (
      <div className="App">
             <button onClick = { () => this.props.exit() }>
                {this.props._exit ? 'Visitca':'Bomsh React-Redux proect' }
             </button>
              { this.props._exit ? 
              <Main/> : 
              <div>
                <img class="fit-picture" src={logo} alt="German Vor" className='me'/>
                <div></div>
                <h className='header'> Created by German Vorotnikov </h>
                  <HashRouter>
                  <div style={{clear:'both', marginTop: '20px'}}></div>
                  <nav>
                      <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                      </ul>
                  </nav>
                  <main>
                      <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/contact" component={Contact}/>
                        <Route component={Whoops404} />
                      </Switch>
                  </main>
                  </HashRouter>
              </div> }
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