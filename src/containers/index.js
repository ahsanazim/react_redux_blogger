import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index.js';

class Index extends Component {

  constructor(props) {
    super(props);

    this.renderPostList = this.renderPostList.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPostList() {
    if (this.props.posts != null) {
      return this.props.posts.map((post) => {
        return <li key={post.id}><Link to={`posts/${post.id}`}>{`${post.title} ${post.tags}`}</Link></li>;
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <ul id="indexPostList">
        {this.renderPostList()}
      </ul>
    );
  }
}


const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    curr_post: state.posts.post,
  }
);

// react-redux glue
export default connect(mapStateToProps, { fetchPosts })(Index);
