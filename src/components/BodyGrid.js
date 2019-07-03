import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as postsActions from "../store/posts/actions"
import  * as topicsSelectors from "../store/posts/reducer"
import AllPostsView from '../components/AllPostsView'
import _ from 'lodash';

class BodyGrid  extends  Component{
    constructor(props){
        super(props);
        autoBind(this);
    }
    AddPostLater(Post){
        this.props.submitNewPost({
            title : Post.title,
            url : Post.url,
            id : Post.id,
            thumbnail: Post.thumbnail
        });
    }
    shouldComponentUpdate(nextProps){
        return !_.isEqual(nextProps.AllPosts, this.props.AllPosts );
    }
    render(){
        return (<div>
            {this.props.AllPosts.length ? <button onClick={this.props.clearPostsById}>CLS</button>:<div/>}
            <div className="GRID"> 
               
               <ul> {this.props.AllPosts.map( (Post) => {
                    return (
                        <li>
                        <AllPostsView
                            title ={Post.title}
                            url = {Post.url}
                            id = {Post.id}
                            thumbnail = {Post.thumbnail}
                            AddPostLater = {this.AddPostLater}
                         />
                        </li>
                    )
                })
            }</ul>
        </div>  
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        AllPosts : topicsSelectors.getAllPosts(state)
    };
}

function mapDispatchToProps (dispatch){
    return {
        submitNewPost: (Post) => {
            dispatch(postsActions.addPostArray(Post))
        },
        clearPostsById: () => {
            dispatch( {type : 'CLS_postsById'} )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(BodyGrid);

