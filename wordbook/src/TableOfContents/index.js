import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import List from './List';

export default class TableOfContents extends Component {
  render () {
    const { level, section, wordset, exercise } = this.props.match.params;
    console.log(level, section, wordset, exercise);
    return (
      <div className='card'>
        <div className='card-body'>
          <h1 className='card-title'>Table Of Contents</h1>
          <div className='list-group'>
            <Route
              path='/learning/:level(level)?'
              render={({ match }) => (
                <List
                  typeUrl='level'
                  url={match.url}
                  title='Levels'
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
                  title='Sections'
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
                  title='Wordsets'
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
                  title='Wordsets'
                />}
            />
            <Route
              path='/learning/level/:level/section/:section/wordset/:wordset'
              render={({ match }) =>
                <List
                  typeUrl='exercise'
                  section={match.params.section}
                  level={match.params.level}
                  wordset={match.params.wordset}
                  url={match.url}
                  title='Exercises'
                />}
            />
          </div>
        </div>
      </div>
    );
  }
}
