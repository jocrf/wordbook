import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import List from './List';
import Level from './Level';
import Section from './Section';
import Wordset from './Wordset';
import levels from './levels-config';
// import placementLevels from './placement-config';

export default class TableOfContents extends Component {
  render () {
    const { level, section, wordset, exercise } = this.props.match.params;
    console.log(level, section, wordset, exercise);
    return (
      <React.Fragment>
        {/* TODO: add a back button for navigation */}
        <h1>Table Of Contents</h1>
        <nav className='nav'>
          <h2>Level {level}</h2>
          <Route
            path='/learning/:level(level)?'
            render={({ match }) => (
              <List
                typeUrl='level'
                url={match.url}
              />
            )}
          />
          <Route
            path='/learning/level/:level'
            render={({ match }) => (
              <List
                typeUrl='section'
                level={match.params.level}
                url={match.url}
              />
            )}
          />
          <Route
            path='/learning/level/:level/section/:section'
            render={({ match }) => 
            <List
              typeUrl='wordset'
              url={match.url}
              level={match.params.level} 
              section={match.params.section}
            />}
          />
          <Route
            path='/learning/level/:level/section/:section/review/:review'
            render={({ match }) =>
              <List
                typeUrl='review'
                url={match.url}
                section={match.params.section}
                level={match.params.level}
              />}
          />
          <Route
            path='/learning/level/:level/section/:section/wordset/:wordset'
            render={({ match }) =>
            <Wordset
              typeUrl='exercise'
              section={match.params.section}
              level={match.params.level}
              wordset={match.params.wordset}
              url={match.url}
            />}
          />
        </nav>
      </React.Fragment>
    );
  }
}
