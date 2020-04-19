import React, { Component } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import * as postsActions from "../store/posts/actions";
import * as topicsSelectors from "../store/posts/reducer";
import AllPostsView from "../components/AllPostsView";
import _ from "lodash";

class BodyGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      ref: React.createRef(),
      columns: 3,
    };
  }
  componentWillMount() {
    var LocalPostArray = JSON.parse(localStorage.getItem("LocalPostArray"));
    if (LocalPostArray) {
      LocalPostArray.forEach((a) =>
        this.props.submitNewPost({
          title: a.title,
          url: a.url,
          id: a.id,
          thumbnail: a.thumbnail,
        })
      );
    }

    if (document.body.clientWidth <= 420) this.setState({ columns: 1 });
    else if (document.body.clientWidth > 1024) this.setState({ columns: 4 });
  }
  AddPostLater(Post) {
    this.props.submitNewPost({
      title: Post.title,
      url: Post.url,
      id: Post.id,
      thumbnail: Post.thumbnail,
    });
  }
  shouldComponentUpdate(nextProps) {
    if (!_.isEqual(nextProps.AllPosts, this.props.AllPosts)) {
      this.Visualization();
      return true;
    } else return false;
  }

  Visualization() {
    let arr = [...document.querySelectorAll("div.GRID .column")];

    let columns = this.state.columns;
    //в каких то случаях лежует устанавливать все в роцентах, в каких то в пикселях
    let width = this.state.ref.current.clientWidth; // в пикселях

    arr.forEach(function (el) {
      el.style.width = 100 / columns + "%";

      el.childNodes.forEach((a) => (a.style.width = "90%"));
    });
  }
  render() {
    let ArrColumns = [];
    let w = this.props.AllPosts.length / this.state.columns;
    for (let i = 0; i < this.state.columns; i++) {
      ArrColumns[i] = (
        <div className="column">
          {this.props.AllPosts.slice(i * w, (i + 1) * w).map((Post) => (
            <AllPostsView
              title={Post.title}
              url={Post.url}
              id={Post.id}
              thumbnail={Post.thumbnail}
              AddPostLater={this.AddPostLater}
            />
          ))}
        </div>
      );
    }

    return (
      <div>
        {this.props.AllPosts.length ? (
          <button onClick={this.props.clearPostsById}>CLS</button>
        ) : (
          <div />
        )}
        <div className="GRID" ref={this.state.ref}>
          {ArrColumns.reverse().map((el) => el)}
          <div></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllPosts: topicsSelectors.getAllPosts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitNewPost: (Post) => {
      dispatch(postsActions.addPostArray(Post));
    },
    clearPostsById: () => {
      dispatch({ type: "CLS_postsById" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyGrid);
