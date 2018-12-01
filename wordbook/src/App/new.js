import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import LearningPage from '../LearningPage';

export default class App extends Component {
  render () {
    return (
      <React.Fragment>
        <nav>
          <NavLink exact to='/'>Home</NavLink>
          <NavLink to='/account'>Account</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/learning'>Learning</NavLink>
        </nav>
        <Route exact path='/' render={() => 'This is the dashboard'} />
        <Route path='/account' render={() => 'This is the account'} />
        <Route path='/about' render={() => 'This is the about page'} />
        <Route path='/learning' component={LearningPage} />
      </React.Fragment>
    );
  }
}
