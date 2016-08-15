import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signinUser, signupUser } from '../actions/index.js';

class SignInUp extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', username: '' };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onUNameChange = this.onUNameChange.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPassChange(event) {
    this.setState({ password: event.target.value });
  }

  onUNameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div className="new">
        <div className="textEntry">
          <input className="notContent" onChange={this.onUNameChange} value={this.state.username} placeholder={"username"} />
          <input className="notContent" onChange={this.onEmailChange} value={this.state.email} placeholder={"email"} />
          <input className="notContent" onChange={this.onPassChange} value={this.state.password} placeholder={"password"} />
        </div>
        <div className="buttons">
          <button onClick={() =>
            this.props.signinUser(
              { email: this.state.email, password: this.state.password, username: this.state.username }
            )}>
            Sign In
          </button>
          <button onClick={() =>
            this.props.signupUser(
              { email: this.state.email, password: this.state.password, username: this.state.username }
            )}>
            Sign Up
          </button>
          <Link to="/"><button>Cancel</button></Link>
        </div>
      </div>
    );
  }

}


// react-redux glue
export default connect(null, { signinUser, signupUser })(SignInUp);
