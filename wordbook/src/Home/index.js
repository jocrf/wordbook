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
          Otherwise, continue learning by selecting your level below:
        </p>
        <ul>
          <li><Link to='/learning/level/1'>Level 1</Link></li>
          <li><Link to='/learning/level/2'>Level 2</Link></li>
          <li><Link to='/learning/level/3'>Level 3</Link></li>
          <li><Link to='/learning/level/4'>Level 4</Link></li>
          <li><Link to='/learning/level/5'>Level 5</Link></li>
          <li><Link to='/learning/level/6'>Level 6</Link></li>
          <li><Link to='/learning/level/7'>Level 7</Link></li>
          <li><Link to='/learning/level/8'>Level 8</Link></li>
        </ul>
      </main>
    );
  }
}
