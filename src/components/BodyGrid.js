import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as postsActions from "../store/posts/actions"
import  * as topicsSelectors from "../store/posts/reducer"
import AllPostsView from '../components/AllPostsView'
import _ from 'lodash';

class BodyGrid  extends  Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            ref: React.createRef()
        }
    }
    componentWillMount(){
        var LocalPostArray = JSON.parse(localStorage.getItem("LocalPostArray")) ;
        if(LocalPostArray){
            LocalPostArray.forEach( a => this.props.submitNewPost({
                title : a.title,
                url : a.url,
                id : a.id,
                thumbnail: a.thumbnail,
            }) )
        }
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
        if( !_.isEqual(nextProps.AllPosts, this.props.AllPosts ) ) {
            //да , нужно обновлять
            return true;
        } else return false;
    }

    componentDidUpdate() {
        this.Visualization()
    }

    Visualization(){
        let arr = [...document.querySelectorAll('div.GRID li')];
        console.dir( this.state.ref.current )
      
        let width = this.state.ref.current.clientWidth ; // в пикселях
        let mainTop = this.state.ref.current.offsetTop;
        let mainLeft = this.state.ref.current.offsetLeft
        const a = 3; // смещение для разных экранов - разное, позже надо поменять 
        let offset = width / a; 

        arr.forEach( function( el, ind){

            el.style.width = offset + 'px';
            //el.style.left = (ind % a) * offset + mainLeft +'px';
            let x = (ind % a) * offset + mainLeft;
            let y = mainTop;

            if( ind-a >= 0 ) {
                console.log( ind )
               
                y = +window.getComputedStyle(arr[ind-a]).transform.split(/\(|,\s|\)/)[6] + arr[ind-a].offsetHeight; //arr[ind-a].getBoundingClientRect().top
                console.log( +window.getComputedStyle(arr[ind-a]).transform.split(/\(|,\s|\)/)[6] )
                console.dir(arr[ind-a] )
            } 
          
           el.style.transform = 'translateX('+x+'px) translateY('+y+'px)';
        } );

        //this.state.ref.current.clientHeight = ;
    }
    render(){
        return (<div>
            {this.props.AllPosts.length ? <button onClick={this.props.clearPostsById}>CLS</button>:<div/>}
            <div className="GRID" ref={this.state.ref} > 
               <ul> {this.props.AllPosts.map( (Post)=> {
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
                    );
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

