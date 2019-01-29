import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Breadcrumb extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pretest: false
    }
  }

  componentDidUpdate (prevProps) {
    const exercise = this.props.match.params.exercise;
    if (exercise !== prevProps.match.params.exercise) {
      if (exercise === '0') {
        this.setState({ pretest: true });
      } else {
        this.setState({ pretest: false });
      }
    }
  }
  
  render () {
    const { learning, level, section, wordset, exercise, l, s, w, e } = this.props.match.params;
    return (
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <NavLink to='/'>Home</NavLink>
          </li>
          {learning === 'learning' && 
            <li className='breadcrumb-item'>
              <NavLink to='/learning'>Learning</NavLink>
            </li>
          }
          {l &&
            <li className='breadcrumb-item'>
              <NavLink to={`/learning/level/${level}`}>Level {level}</NavLink>
            </li>
          }
          {s &&
            <li className='breadcrumb-item'>
              <NavLink to={`/learning/level/${level}/section/${section}`}>Section {section}</NavLink>
            </li>
          }
          {w && wordset !== 'review' &&
            <li className='breadcrumb-item'>
              <NavLink to={`/learning/level/${level}/section/${section}/wordset/${wordset}`}>Wordset {wordset}</NavLink>
            </li>
          }
          {wordset === 'review' && 
            <li className='breadcrumb-item'>
              <NavLink to={`/learning/level/${level}/section/${section}/review/${wordset}`}>Review Test</NavLink>
            </li>
          }
          {e && this.state.pretest &&
            <li className='breadcrumb-item'>
            <NavLink to={`/learning/level/${level}/section/${section}/review/${wordset}/exercise/${exercise}`}>Pretest</NavLink>
            </li>
          }
          {e && !this.state.pretest &&
            <li className='breadcrumb-item'>
            <NavLink to={`/learning/level/${level}/section/${section}/review/${wordset}/exercise/${exercise}`}>Exercise {exercise}</NavLink>
            </li>
          }
        </ol>
      </nav>
    )
  }
}