import React, { Component } from 'react';
import QuizContainer from '../QuizContainer/index';
import { Route, Link } from 'react-router-dom';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.currentLevel = 1;
    this.placementCompleted = true;
  }

  render () {
    return (
      <React.Fragment>
        <h1>Welcome to the Wordbook App</h1>
        <Link to='placement'>Take the placement quiz</Link>
        <Route path='/placement' component={QuizContainer} />
      </React.Fragment>
    );
  }
}
