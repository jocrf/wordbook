import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Level from './Level';
import levels from './levels-config';

export default class TableOfContents extends Component {
  render () {
    return (
      <React.Fragment>
        {/* TODO: add a back button for navigation */}
        <h1>Table Of Contents</h1>
        <ul>
          {levels.map(level => (
            <li key={level.title}><NavLink to={`/learning/level/${level.title}`}>Level {level.title}</NavLink></li>
          ))}
        </ul>
        <Route
          path='/learning/level/:level'
          render={({ match }) => <Level level={match.params.level} url={match.url} />}
        />
      </React.Fragment>
    );
  }
}
