import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import levels from './levels-config';

export default class Section extends Component {
  render () {
    const level = levels[this.props.level - 1];
    const section = level.sections[this.props.section - 1];
    const url = this.props.url;

    return (
      <React.Fragment>
        <ul className='nav-item dropdown'>
          <h2 className='dropdown-header'>Section {section.title}</h2>
          {section.wordsets.map(wordset => (
            <li key={wordset.title}>
              <NavLink to={`${url}/wordset/${wordset.title}`}>Wordset {wordset.title}</NavLink>
            </li>
          ))}
          {section.review.map(review => (
            <li key={review.title}>
              <NavLink to={`${url}/review/${review.title}`}>Review {review.title}</NavLink>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
