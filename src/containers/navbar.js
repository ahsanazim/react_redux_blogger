import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/index.js';

const NavBar = (props) => {
  function renderSign() {
    if (props.authenticated) {
      return (
        <li><button onClick={props.signoutUser}>Sign Out</button></li>
      );
    } else {
      return (
        <li><Link to="/signinup">Sign In / Sign Up</Link></li>
      );
    }
  }

  return (
    <nav>
      <li><Link to="/">bloggr</Link></li>
      <li><Link to="/user">Profile</Link></li>
      <li><Link to="/posts/new"><i className="fa fa-plus-square-o" aria-hidden="true"></i>new post</Link></li>
      {renderSign()}
    </nav>
  );
};

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue
export default connect(mapStateToProps, { signoutUser })(NavBar);
