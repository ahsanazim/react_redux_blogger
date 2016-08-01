import React from 'react';
import { Link } from 'react-router';


const NavBar = () => {
  return (
    <nav>
      <li><Link to="/">bloggr</Link></li>
      <li><Link to="posts/new">new post</Link></li>
    </nav>
  );
};

export default NavBar;
