import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import levels from './levels-config';

export default class List extends Component {
  render () {
    let array, level, section, wordset, exercise;
    // eslint-disable-next-line default-case
    switch(this.props.typeUrl) {
      case 'level':
        array = levels;
        break;
      case 'section':
        level = this.props.level - 1;
        array = levels[level].sections;
        break;
      case 'wordset':
        level = this.props.level - 1;
        section = this.props.section - 1;
        array = levels[level].sections[section].wordsets;
        array.push(levels[level].sections[section].review);
        break;
      case 'review':
        level = this.props.level - 1;
        section = this.props.section - 1;
        array = levels[level].sections[section].wordsets;
        array.push(levels[level].sections[section].review);
        break;
      case 'exercise':
        array = levels[level].sections[section].wordsets.exercises;
        wordset = section.wordsets[this.props.wordset - 1];
        break;
    }
    console.log(array);
    return (
      <ul>
        {array.map(arrayItem => (
          <li key={arrayItem.title}>
            <NavLink
              to={`${this.props.url}/${this.props.typeUrl}/${arrayItem.title}`}
              >
              {this.props.typeUrl} {arrayItem.title}
            </NavLink>
          </li>
        ))}
      </ul>
    )
  }
}

{/* <ul>
  {
    Array.map(item => (
      <li>
        <NavLink to previouUrl + currentitemtype + currentitemtitle> 'item type + item title'
        </NavLink>
      </li>
    ))
  }
</ul> */}