import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Level from './Level';

export default class TableOfContents extends Component {
  render () {
    return (
      <React.Fragment>
        {/* TODO: add a back button for navigation */}
        <h1>Table Of Contents</h1>
        <ul>
          <li><NavLink to='/learning/level/1'>Level 1</NavLink></li>
          <li><NavLink to='/learning/level/2'>Level 2</NavLink></li>
          <li><NavLink to='/learning/level/3'>Level 3</NavLink></li>
          <li><NavLink to='/learning/level/4'>Level 4</NavLink></li>
          <li><NavLink to='/learning/level/5'>Level 5</NavLink></li>
          <li><NavLink to='/learning/level/6'>Level 6</NavLink></li>
          <li><NavLink to='/learning/level/7'>Level 7</NavLink></li>
          <li><NavLink to='/learning/level/8'>Level 8</NavLink></li>
        </ul>
        <Route
          path='/learning/level/:level'
          render={({ match }) => <Level level={match.params.level} />}
        />
      </React.Fragment>
    );
  }
}
