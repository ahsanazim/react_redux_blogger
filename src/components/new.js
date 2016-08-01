import React, { Component } from 'react';


class New extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', tags: '', content: '' };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div>
        <input onChange={this.onTitleChange} value={this.state.title} placeholder={"title"} />
        <input onChange={this.onTagsChange} value={this.state.tags} placeholder={"tags"} />
        <input onChange={this.onContentChange} value={this.state.content} placeholder={"content"} />
        <button onClick={() => this.props.onCreateClick(this.state.notetitle)}>Submit</button>
        <button onClick={() => this.props.onCreateClick(this.state.notetitle)}>Cancel</button>
      </div>
    );
  }

}

export default New;
