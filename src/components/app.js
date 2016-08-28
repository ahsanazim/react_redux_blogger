import React, { Component } from 'react';
import NavBar from '../containers/navbar.js';
import Error from '../containers/error';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="mainContainer">
        <NavBar />
        <Error />
        <div id="childContainer">
          {this.props.children}
        </div>
        <footer>Ahsan Azim</footer>
      </div>
    );
  }
}

export default App;
