import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Section from './Section';
import levels from './levels-config';

export default class Level extends Component {
  render () {
    // -1 for zero-index
    const level = levels[this.props.level - 1];
    const url = this.props.url;
    return (
      <React.Fragment>
        <h2>Level {level.title}</h2>
        <ul>
          {level.sections.map(section => (
            <li key={section.title}>
              <NavLink to={`${url}/section/${section.title}`}>Section {section.title}</NavLink>
            </li>
          ))}
        </ul>
        <Route
          path='/learning/level/:level/section/:section'
          render={({ match }) => <Section url={match.url} section={match.params.section} level={match.params.level} />}
        />
      </React.Fragment>
    );
  }
}
