import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Wordset from './Wordset';

export default class Section extends Component {
  render () {
    const { level, section } = this.props;
    return (
      <React.Fragment>
        <h2>Section {section}</h2>
        <ul>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/1`}>Wordset 1</NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/2`}>Wordset 2</NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/3`}>Wordset 3</NavLink>
          </li>
        </ul>
        <Route
          path='/learning/level/:level/section/:section/wordset/:wordset'
          render={({ match }) => <Wordset section={match.params.section} level={match.params.level} wordset={match.params.wordset} />}
        />
      </React.Fragment>
    );
  }
}
