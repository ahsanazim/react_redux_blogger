import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <nav>
      <li><Link to="/">bloggr</Link></li>
      <li><Link to="/posts/new"><i className="fa fa-plus-square-o" aria-hidden="true"></i>new post</Link></li>
    </nav>
  );
};

export default NavBar;
