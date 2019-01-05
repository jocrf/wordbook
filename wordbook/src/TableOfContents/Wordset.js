import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Wordset extends Component {
  render () {
    const { level, section, wordset } = this.props;
    return (
      <React.Fragment>
        <h2>Wordset {wordset}</h2>
        <ul>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/pretest`}>
              Pretest
            </NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/1`}>
              Exercise 1
            </NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/2`}>
              Exercise 2
            </NavLink>
          </li>
          <li>
            <NavLink to={`/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/3`}>
              Exercise 3
            </NavLink>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
