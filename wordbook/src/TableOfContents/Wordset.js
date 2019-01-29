import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import levels from './levels-config';

export default class Wordset extends Component {
  render () {
    const url = this.props.url;
    const level = levels[this.props.level - 1];
    const section = level.sections[this.props.section - 1];
    const wordset = section.wordsets[this.props.wordset - 1];

    return (
      <React.Fragment>
        <h2>Wordset {wordset.title}</h2>
        <ul>
          {wordset.exercises.map(exercise => (
            <li key={exercise.id}>
              <NavLink to={`${url}/exercise/${exercise.id}`}>
                {exercise.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
