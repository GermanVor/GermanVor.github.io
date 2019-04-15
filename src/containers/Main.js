//временная хуйня
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import '../style/Basic.css'
import * as postsActions from "../store/posts/actions";
import * as types from "../store/posts/actionTypes";
import  * as topicsSelectors from "../store/posts/reducer"
import  Check from '../components/Check'
import AllPostsView from '../components/AllPostsView'
import ReactDOM from 'react-dom'

class Xyinia extends  Component{
    constructor(props){
        super(props);
        autoBind(this);
    }
    componentWillMount(){//componentDidMount
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
    componentDidMount(){
       // var refs = ReactDOM.findDOMNode('Ch').getBoundingClientRect();
        //console.dir(refs);
    }
    render(){
        return (
                <div>
                    <ul className='Topics'>
                        {
                        this.props.subredditArray.map( (a) => {
                            return (
                                    <li><Check
                                        Url = {a.url}
                                        onClickToGetPost = {this.props.PostAction}
                                        title={a.title}
                                        description={a.description}
                                    /></li>
                            )
                        })

                    }</ul>

                    <div className="GRID">{
                        this.props.AllPosts.map( (Post) => {
                        return (
                            <div>
                            <AllPostsView
                                title ={Post.title}
                                url = {Post.url}
                                id = {Post.id}
                                thumbnail = {Post.thumbnail}
                             />
                              <button onClick={() => this.AddPostLater(Post)}>Add</button>
                            </div>
                        )
                    })
                    }</div>
                    <h1><strong>-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-</strong></h1>
                        <button onClick={this.props.clearAllPost}>CLS</button>
                    <h1><strong>-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-</strong></h1>
                <div className="Footer">{
                        this.props.PostArray.map( (a) => {
                            console.log(a);
                            return (<div >
                                    <h1>{a.title}</h1>
                                    {!a.thumbnail ? false :
                                        <img className="thumbnail" src={a.thumbnail} alt="thumbnail"/>
                                    }
                                    <form action={a.url} target="_blank">
                                        <input type="submit" value="GoToSource" />
                                    </form>
                                    <button onClick={()=> this.props.DelPost(a.id)}>RunDry</button>
                                </div>
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
        PostArray : topicsSelectors.getPostArray(state),
        AllPosts : topicsSelectors.getAllPosts(state)
    };
}

function mapDispatchToProps (dispatch){
    return {
        submitNewPost: (Post) => {
            dispatch(postsActions.addPostArray(Post))
        },
        clearAllPost: ()=>{
            dispatch({type : types.CLS})
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
