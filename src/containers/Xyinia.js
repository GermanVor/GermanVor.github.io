//временная хуйня
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../style/basics.css'
import PostView from '../components/PostView'
import * as postsActions from "../store/posts/actions";
import * as types from "../store/posts/actionTypes";
import  * as topicsSelectors from "../store/posts/reducer"
import  Check from '../components/Check'

class Xyinia extends  Component{
    constructor(props){
        super(props);
        this.state = {
            input: ''
        };
        autoBind(this);
    }

    componentDidMount(){
        this.props.TopicsAction();
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    submitMessage() {

        if(this.state.input!=='')//this.state.input!==''
            this.props.submitNewMessage(
                <PostView
                    tit={this.state.input}
                    CLS={this.clearMessage}
                />);

        console.log(this.props);
        this.setState({
            input: ''
        });
    }
    clearMessage(){
        console.log(this.props);
        this.props.clearAllMessage();
        this.setState({
            input: ''
        });
    }

    render(){
        return (
            <div>
                <h1>Type in a new Message:</h1>
                <input
                    value={this.state.input}
                    onChange={this.handleChange}/><br/>
                <button onClick={this.submitMessage}>Submit</button>
                <button onClick={this.clearMessage}>Clear ALL</button>
                <div className='GRID'>{
                    this.props.messages.map( (message, idx) => {
                    return (
                    <div key={idx}>{message}</div>
                    )
                })
                }</div>

                <div className='GRID'>{
                    this.props.subredditArray.map( (a) => {
                        return (
                            <Check
                                Url = {a.url}
                                onClick={this.props.submitNewMessage}
                                onClickToGetPost = {this.props.PostAction}
                                title={a.title}
                                description={a.description}
                            />
                        )
                    })
                }</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subredditArray : topicsSelectors.getTopics(state),
        messages : topicsSelectors.getMessages(state)
    };
}

function mapDispatchToProps (dispatch){

    return {
        submitNewMessage: (message) => {
            dispatch(postsActions.addMessage(message))
        },
        clearAllMessage: ()=>{
            dispatch({type : types.CLS})
        },
        TopicsAction : () => {
            dispatch(postsActions.fetchTopics())
        },
        PostAction : (Url) => {
            dispatch(postsActions.fetchPosts(Url))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Xyinia);
