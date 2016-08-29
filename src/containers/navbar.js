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
        <li><Link to="/signinup"><i className="fa fa-sign-in" aria-hidden="true"></i></Link></li>
      );
    }
  }

  return (
    <nav>
      <li><Link to="/"><span className="logo">bloggr</span></Link></li>
      <li><Link to="/user"><i className="fa fa-user" aria-hidden="true"></i></Link></li>
      <li><Link to="/posts/new"><i className="fa fa-plus-square-o" aria-hidden="true"></i></Link></li>
      {renderSign()}
    </nav>
  );
};

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    username: state.user.username,
  }
);

// react-redux glue
export default connect(mapStateToProps, { signoutUser })(NavBar);
