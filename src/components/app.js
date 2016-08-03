import React, { Component } from 'react';
import NavBar from './navbar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="mainContainer">
        <NavBar />
        <div id="childContainer">
          {this.props.children}
        </div>
        <footer>Ahsan Azim</footer>
      </div>
    );
  }
}

export default App;
