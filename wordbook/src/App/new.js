import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LearningPage from '../LearningPage';
import Home from '../Home';
import PlacementPage from '../PlacementPage';
import Breadcrumb from '../Breadcrumb';

export default class App extends Component {
  render () {
    return (
      <React.Fragment>
        <h1>Wordbook App</h1>
        <Route path='/:learning?/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?' component={Breadcrumb} />
        <Route exact path='/' component={Home} />
        <Route path='/placement' component={PlacementPage} />
        <Route path='/learning' component={LearningPage} />
      </React.Fragment>
    );
  }
}
