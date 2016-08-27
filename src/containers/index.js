import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts, searchPosts } from '../actions/index.js';

class Index extends Component {

  constructor(props) {
    super(props);

    this.state = { query: '', searching: false };

    this.renderPostList = this.renderPostList.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.renderSearchButtons = this.renderSearchButtons.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  getAllPosts() {
    this.setState({ searching: false });
    this.props.fetchPosts();
  }

  doSearch() {
    this.setState({ searching: true });
    this.props.searchPosts(this.state.query);
  }

  renderPostList() {
    if (this.props.posts != null) {
      return this.props.posts.map((post) => {
        return (
          <li key={post.id}>
            <Link to={`posts/${post.id}`}>
              <span>{post.title}</span>
              <span id="mainTags">{`${post.tags} -- by ${post.author}`}</span>
            </Link>
          </li>
        );
      });
    } else {
      return <div></div>;
    }
  }

  renderSearchButtons() {
    if (this.state.searching) {
      return (
        <div className="buttons">
          <button type="button" onClick={this.doSearch}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
          <button type="button" onClick={this.getAllPosts}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </div>
      );
    } else {
      return (
        <div className="buttons">
          <button type="button" onClick={this.doSearch}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <ul id="indexPostList">
        <div className="searchContainer">
          {this.renderSearchButtons()}
          <input type="search" onChange={this.onQueryChange}
            value={this.state.query} placeholder={"Search"}
          />
        </div>
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
export default connect(mapStateToProps, { fetchPosts, searchPosts })(Index);
