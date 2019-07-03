import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../style/Basic.css'
import * as postsActions from "../store/posts/actions";
import * as types from "../store/posts/actionTypes";
import  * as topicsSelectors from "../store/posts/reducer"
import  Check from '../components/Check'
import Topics from '../components/Topics'
import BodyGrid from '../components/BodyGrid'
import FooterPostView from '../components/FooterPostView'

class Xyinia extends  Component{
    constructor(props){
        super(props);
        autoBind(this);
    }
    componentWillMount(){
        this.props.TopicsAction();
    }
    AddPostLater(Post){
        this.props.submitNewPost({
            title : Post.title,
            url : Post.url,
            id : Post.id,
            thumbnail: Post.thumbnail
        });
    }
    CheckWrapper(props){
        return(
            <Check
                Url = {props.url}
                onClickToGetPost = {this.props.PostAction}
                title={props.title}
                description={props.description}
            />
        )
    }
    render(){
        return (
                <div className='ReactMain'>
                    <Topics
                        subredditArray = {this.props.subredditArray}
                        CheckWrapper = {this.CheckWrapper}
                    />
                
                <BodyGrid />

                {this.props.PostArray.length ? <button onClick={this.props.clearPostArray}>CLS</button>:<div/>}

                <div className="Footer">
                <ul>{
                        this.props.PostArray.map( (a) => {
                            return (<li><FooterPostView
                                id = {a.id}
                                title = {a.title}
                                url = {a.url}
                                thumbnail = {a.thumbnail}
                                DelPost = {this.props.DelPost}
                            /></li>
                            )
                        })
                }</ul></div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subredditArray : topicsSelectors.getTopics(state),
        PostArray : topicsSelectors.getPostArray(state),
    };
}

function mapDispatchToProps (dispatch){
    return {
        submitNewPost: (Post) => {
            dispatch(postsActions.addPostArray(Post))
        },
        clearPostArray: ()=>{
            dispatch( {type : types.CLS_PostArray} )
        },
        TopicsAction : () => {
            dispatch(postsActions.fetchTopics())
        },
        PostAction : (Url) => {
            dispatch(postsActions.fetchPosts(Url))
        },
        DelPost : (id) =>{
            dispatch({type : types.DelPost , id : id})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Xyinia);