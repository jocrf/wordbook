import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LearningPage from '../LearningPage';
import ExercisePage from '../ExercisePage';
import Home from '../Home';

export default class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Route exact path='/' component={Home} />
        <Route path='/placement' component={ExercisePage} />
        <Route path='/learning' component={LearningPage} />
      </React.Fragment>
    );
  }
}
