import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import levels from './levels-config';

export default class Level extends Component {
  render () {
    // -1 for zero-index
    const level = levels[this.props.level - 1];
    const url = this.props.url;
    return (
      <React.Fragment>
        <ul className='nav-item dropdown'>
          <h2 className='dropdown-header'>Level {level.title}</h2>
          {level.sections.map(section => (
            <li key={section.title}>
              <NavLink to={`${url}/section/${section.title}`}>Section {section.title}</NavLink>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
