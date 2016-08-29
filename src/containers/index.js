import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts, searchPosts, getTags } from '../actions/index.js';
import Autosuggest from 'react-autosuggest';


class Index extends Component {

  constructor(props) {
    super(props);

    this.state = { query: '', searching: false, value: '', suggestions: [] };

    this.renderPostList = this.renderPostList.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.renderSearchButtons = this.renderSearchButtons.bind(this);
    this.doSearch = this.doSearch.bind(this);

    // =========================  Autcomplete
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    // =========================
  }

  componentWillMount() {            // MOUNTING
    this.props.fetchPosts();
    this.props.getTags();
  }

  // *****************************  Autcomplete ********************************

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
  };


  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  getAllPosts() {
    this.setState({ searching: false });
    this.props.fetchPosts();
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');

    return this.props.tags.filter(tag => regex.test(tag.name));
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  // NOT AUTCOMPLETE, placed here b/c of eslint function ordering
  doSearch() {
    this.setState({ searching: true });
    this.props.searchPosts(this.state.value);
  }

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }

  // ***************************************************************************

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
    // =========================  Autcomplete
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'search for a tag',
      value,
      onChange: this.onChange,
    };
    // =========================

    return (
      <ul id="indexPostList">
        <div className="searchContainer">
          {this.renderSearchButtons()}
          <div className="autocompleteContainer">
            <Autosuggest className="searchBar"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
          </div>
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
    tags: state.tags.tagsList,
  }
);

// react-redux glue
export default connect(mapStateToProps, { fetchPosts, searchPosts, getTags })(Index);
