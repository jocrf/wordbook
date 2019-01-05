import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Section from './Section';

export default class Level extends Component {
  render () {
    const level = this.props.level;
    return (
      <React.Fragment>
        <h2>Level {level}</h2>
        <ul>
          <li>
            <NavLink to={`/learning/level/${level}/section/1`}>Section 1</NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/2`}>Section 2</NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/3`}>Section 3</NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/4`}>Section 4</NavLink>
          </li>
        </ul>
        <Route
          path='/learning/level/:level/section/:section'
          render={({ match }) => <Section section={match.params.section} level={match.params.level} />}
        />
      </React.Fragment>
    );
  }
}
