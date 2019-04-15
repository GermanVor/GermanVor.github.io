import React, { Component } from 'react';
import autoBind from "react-autobind";

export default class  Check extends  Component{
    constructor(props){
        super(props);
        autoBind(this);
    }

    render(){
        return (
            <div className="Check" >
                    <h3>{this.props.title}</h3>
                <div>
                    <form action={'https://www.reddit.com' + this.props.Url} target="_blank">
                        <input type="submit" value="GoToSource"  alt="thumbnail"/>
                    </form>
                    <button onClick={()=>this.props.onClickToGetPost(this.props.Url)}>GetPost</button>
                </div>
            </div>
        )
    };
}
