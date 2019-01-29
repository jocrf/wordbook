import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Level from './Level';
import Section from './Section';
import Wordset from './Wordset';
import levels from './levels-config';
// import placementLevels from './placement-config';

export default class TableOfContents extends Component {
  render () {
    return (
      <React.Fragment>
        {/* TODO: add a back button for navigation */}
        <h1>Table Of Contents</h1>
        <nav className='nav nav-pills'>
          <h2 className='dropdown-toggle' onClick={() => this.showDropdown('level')}>Level {this.props.match.params.level}</h2>
          <Route
            path='/learning/(level)?'
            render={() => (
              <ul className='nav-item dropdown'>
                {levels.map(level => (
                  <li key={level.title} className='dropdown-item'><NavLink to={`/learning/level/${level.title}`}>Level {level.title}</NavLink></li>
                ))}
              </ul>
            )}
          />
          <Route
            path='/learning/level/:level'
            render={({ match }) => <Level level={match.params.level} url={match.url} />}
          />
          <Route
            path='/learning/level/:level/section/:section'
            render={({ match }) => <Section url={match.url} section={match.params.section} level={match.params.level} />}
          />
          <Route
            path='/learning/level/:level/section/:section/wordset/:wordset'
            render={({ match }) => <Wordset section={match.params.section} level={match.params.level} wordset={match.params.wordset} url={match.url} />}
          />
        </nav>
      </React.Fragment>
    );
  }
}
