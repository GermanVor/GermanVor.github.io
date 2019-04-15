import React, { Component } from 'react';
import autoBind from 'react-autobind';
import '../style/basics.css'
//import * as postsSelectors from '../store/posts/reducer';
//import connect from "react-redux/es/connect/connect";

export default  class PostView extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

   render(){
       return (
           <div className='cart' >
           <h3>{this.props.tit}</h3>
               <p style={{width: 200,height: 250 }}>sedfghj</p>
       <div className="cta">
           <button className="Puuk" onClick={this.props.CLS}>CLS</button>
           <button className="Read">Read</button>
       </div>
           </div>
       );
   }
}

 //connect(postsSelectors.mapStateToProps,postsSelectors.mapDispatchToProps)(PostView);