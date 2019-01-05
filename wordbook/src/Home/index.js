import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render () {
    return (
      <main>
        <h1>
          Welcome to the Wordbook App.
        </h1>
        <p>
          If this is your first visit, take the <Link to='/placement'>placement quiz</Link>.
        </p>
        <p>
          Otherwise, continue <Link to='/learning'>learning</Link>.
        </p>
      </main>
    );
  }
}
