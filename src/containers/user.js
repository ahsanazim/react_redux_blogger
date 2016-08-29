import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser, getUserProfile } from '../actions/index.js';

class User extends Component {

  componentWillMount() {
     // check is for initial half-second
     // otherwise the composed component should work
    if (this.props.authenticated) {
      this.props.getUserProfile(this.props.username);
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {`Username: ${this.props.username}`}
          </div>
          <div>
            {`Email: ${this.props.email}`}
          </div>
          <div>
            {`Posts: ${this.props.numPosts}`}
          </div>
        </div>
        <button onClick={this.props.signoutUser}>
          Sign Out
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    username: state.user.username,
    email: state.user.email,
    numPosts: state.user.numPosts,
    authenticated: state.auth.authenticated,
  }
);

const mapDispatchToProps =
  {
    signoutUser,
    getUserProfile,
  };

// react-redux glue
export default connect(mapStateToProps, mapDispatchToProps)(User);
