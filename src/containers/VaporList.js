import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './VaporList.css';
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import ListView from '../components/ListView';
import  PostView from '../components/ListView';

class VaporScreen extends  Component{
    constructor(props){
        super(props);
        autoBind(this);
    }

    renderRow(post) {
        return (
            <PostView>
                <h2>{post.title}</h2>
                <a href={this.props.post.url} target="_blank">
                    { !post.thumbnail ? false :
                        <img src={post.thumbnail} />
                    }
                </a>
                <div className="cta">
                    <button className="Puuk">Puuk</button>
                    <button className="Read">Read</button>
                </div>
            </PostView>
        );
    }

    render(){
        return (
            <div className="VaporList GRID">
                    <ListView
                        rowsIdArray={this.props.topicsUrlArray}
                        rowsById={this.props.topicsByUrl}
                        renderRow={< PostView
                            postTitle={post.title}
                            postURL={this.props.post.url}
                            postThumbnail={post.thumbnail}
                          //this.renderRow
                    />}/>
            </div>
        );
    }
}

