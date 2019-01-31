import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import levels from './levels-config';

export default class List extends Component {
  render () {
    let array, level, section, wordset;
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
        // add review item if it doesn't already exist
        if (array.length === 3) {
          array.push(levels[level].sections[section].review[0]);
        }
        break;
      case 'review':
        level = this.props.level - 1;
        section = this.props.section - 1;
        array = levels[level].sections[section].wordsets;
        break;
      case 'exercise':
        level = this.props.level - 1;
        section = this.props.section - 1;
        wordset = this.props.wordset - 1;
        array = levels[level].sections[section].wordsets[wordset].exercises;
        break;
      default:
        console.log('List component received an unexpected arg');
        break;
    }
    return (
      <ul>
        {array.map(arrayItem => (
          <li key={arrayItem.title}>
            {!arrayItem.title.startsWith('Review') &&
              <NavLink
                to={`${this.props.url}/${this.props.typeUrl}/${arrayItem.id}`}
                >
                {arrayItem.title}
              </NavLink>
            }
            {arrayItem.title.startsWith('Review') &&
              <NavLink
                to={`${this.props.url}/review/${arrayItem.id}`}
              >
                {arrayItem.title}
              </NavLink>
            }
          </li>
        ))}
      </ul>
    )
  }
}
