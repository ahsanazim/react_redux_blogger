import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { deletePost, updatePost, fetchPost } from '../actions/index.js';

class Show extends Component {

  constructor(props) {
    super(props);

    this.renderPost = this.renderPost.bind(this);
  }

  componentWillMount() {
    console.log('entered componentWillMount of Show class');
    console.log(this.props.params.id);
    this.props.fetchPost(this.props.params.id);
  }

  renderPost() {
    if (this.props.curr_post != null) {
      return (
        <div>
          <div>{this.props.curr_post.title}</div>
          <div>{this.props.curr_post.tags}</div>
          <div>{this.props.curr_post.content}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    console.log(`from render function: ${this.props.curr_post}`);
    console.log(this.props.curr_post);
    return (
      <div>
        <div>
          <Link to="/"><span>back to index page</span></Link>
          <button onClick={() => this.props.deletePost(this.props.params.id)}>
            delete
          </button>
        </div>
       {this.renderPost()}
      </div>
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
export default connect(mapStateToProps, { deletePost, updatePost, fetchPost })(Show);
