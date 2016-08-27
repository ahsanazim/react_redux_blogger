import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';
import { deletePost, updatePost, fetchPost } from '../actions/index.js';

class Show extends Component {

  constructor(props) {
    super(props);

    this.state = { titleEditing: false,
                   tagsEditing: false,
                   contentEditing: false,
                   locTitle: '',
                   locTags: '',
                   locContent: '' };

    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.updateText = this.updateText.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  updateText(newText, section) {
    let titleText = this.props.curr_post.title;
    let tagsText = this.props.curr_post.tags;
    let contentText = this.props.curr_post.content;
    switch (section) {
      case 'title':
        titleText = newText;
        break;
      case 'tags':
        tagsText = newText;
        break;
      case 'content':
        contentText = newText;
        break;
      default:
        break;
    }

    this.props.updatePost(this.props.params.id,
      { title: titleText, tags: tagsText, content: contentText, image: this.props.curr_post.image }
    );
  }

  blur(section) {
    switch (section) {
      case 'title':
        this.updateText(this.state.locTitle, 'title');
        this.setState({ titleEditing: !this.state.titleEditing });
        break;
      case 'tags':
        this.updateText(this.state.locTags, 'tags');
        this.setState({ tagsEditing: !this.state.tagsEditing, first: !this.state.first });
        break;
      case 'content':
        this.updateText(this.state.locContent, 'content');
        this.setState({ contentEditing: !this.state.contentEditing });
        break;
      default:
        break;
    }
  }

  focus(input) {
    if (input != null) {
      input.focus();
    }
  }

  renderTitle() {
    if (this.props.curr_post != null) {
      if (this.state.titleEditing) {
        return (
          <div>
            <input className="textbox inputBox"
              defaultValue={this.props.curr_post.title}
              ref={this.focus}
              onBlur={() => this.blur('title')}
              onChange={(event) => this.setState({ locTitle: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="textbox inputBox" onClick={() => this.setState({ titleEditing: !this.state.titleEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.curr_post.title || '') }}
          />
        );
      }
    } else {
      return <div>loading</div>;
    }
  }

  renderTags() {
    if (this.props.curr_post != null) {
      if (this.state.tagsEditing) {
        return (
          <div>
            <input className="textbox inputBox"
              defaultValue={this.props.curr_post.tags}
              ref={this.focus}
              onBlur={() => this.blur('tags')}
              onChange={(event) => this.setState({ locTags: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="textbox inputBox" onClick={() => this.setState({ tagsEditing: !this.state.tagsEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.curr_post.tags || '') }}
          />
        );
      }
    } else {
      return <div>loading</div>;
    }
  }

  renderContent() {
    if (this.props.curr_post != null) {
      if (this.state.contentEditing) {
        return (
          <div>
            <Textarea className="textbox"
              defaultValue={this.props.curr_post.content}
              ref={this.focus}
              onBlur={() => this.blur('content')}
              onChange={(event) => this.setState({ locContent: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="textbox" onClick={() => this.setState({ contentEditing: !this.state.contentEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.curr_post.content || '') }}
          />
        );
      }
    } else {
      return <div>loading</div>;
    }
  }

  render() {
    const imgURL = (this.props.curr_post && this.props.curr_post.image) ? this.props.curr_post.image : 'http://www.patriotenergygroup.com/images2/tba.png';
    return (
      <div className="show">
        <div className="showHeader">
          <Link to="/"><span><i className="fa fa-arrow-left" aria-hidden="true"></i>back to index page</span></Link>
          <button onClick={() => this.props.deletePost(this.props.params.id)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>delete
          </button>
        </div>
        <div className="showText">
          <img src={imgURL} role="presentation" />
          <div className="textSection">{this.renderTitle()}</div>
          <div className="textSection">{this.renderTags()}</div>
          <div className="textSection">{this.renderContent()}</div>
        </div>
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
