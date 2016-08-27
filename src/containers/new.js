import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createPost } from '../actions/index.js';
import Textarea from 'react-textarea-autosize';


class New extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '', tags: '', content: '', file: null, imgURL: null };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
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

  handleImage(e) {
    const file = e.target.files[0];
    if (file != null) {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.setState({
          file,
          imgURL: event.target.result,
        });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    let imgURL;
    if (this.state.imgURL) {
      imgURL = this.state.imgURL;
    } else {
      imgURL = 'http://www.patriotenergygroup.com/images2/tba.png';
    }
    return (
      <div className="new">
        <div className="textEntry">
          <input className="notContent" onChange={this.onTitleChange} value={this.state.title} placeholder={"title"} />
          <input className="notContent" onChange={this.onTagsChange} value={this.state.tags} placeholder={"tags"} />
          <div className="column-form image-column">
            <div> <img role="presentation" src={imgURL} /> </div>
            <input type="file" name="Upload" id="file-input" onChange={this.handleImage} />
          </div>
          <Textarea onChange={this.onContentChange} value={this.state.content} placeholder={"content"} />
        </div>
        <div className="buttons">
          <button onClick={() =>
            this.props.createPost(
              { title: this.state.title, content: this.state.content, tags: this.state.tags },
              this.state.file
            )}>
            Submit
          </button>
          <Link to="/"><button>Cancel</button></Link>
        </div>
      </div>
    );
  }

}


// react-redux glue
export default connect(null, { createPost })(New);
