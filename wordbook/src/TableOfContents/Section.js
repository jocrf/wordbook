import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Wordset from './Wordset';
import levels from './levels-config';

export default class Section extends Component {
  render () {
    const level = levels[this.props.level - 1];
    const section = level.sections[this.props.section - 1];
    const url = this.props.url;

    return (
      <React.Fragment>
        <h2>Section {section.title}</h2>
        <ul>
          {section.wordsets.map(wordset => (
            <li key={wordset.title}>
              <NavLink to={`${url}/wordset/${wordset.title}`}>Wordset {wordset.title}</NavLink>
            </li>
          ))}
        </ul>
        <Route
          path='/learning/level/:level/section/:section/wordset/:wordset'
          render={({ match }) => <Wordset section={match.params.section} level={match.params.level} wordset={match.params.wordset} url={match.url} />}
        />
      </React.Fragment>
    );
  }
}
