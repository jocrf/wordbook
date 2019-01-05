import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

export default class TableOfContents extends Component {
  render () {
    const level = this.props.level;
    return (
      <React.Fragment>
        <h1>Table Of Contents for level {level}</h1>
        <ul>
          <li>
            <Link to={`/learning/level/${level}/section/1`}>Section 1</Link>
          </li>
          <li>
            <Link to={`/learning/level/${level}/section/2`}>Section 2</Link>
          </li>
          <li>
            <Link to={`/learning/level/${level}/section/3`}>Section 3</Link>
          </li>
          <li>
            <Link to={`/learning/level/${level}/section/4`}>Section 4</Link>
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

class Wordset extends Component {
  render () {
    const { level, section, wordset } = this.props;
    return (
      <React.Fragment>
        <h2>Wordset {wordset}</h2>
        <ul>
          {level}{section}{wordset}
          <li>Pretest</li>
          <li>Exercise 1</li>
          <li>Exercise 2</li>
          <li>Exercise 3</li>
        </ul>
      </React.Fragment>
    );
  }
}

class Section extends Component {
  render () {
    const { level, section } = this.props;
    return (
      <React.Fragment>
        <h2>Section {section}</h2>
        <ul>
          <li>
            <Link to={`/learning/level/${level}/section/${section}/wordset/1`}>Wordset 1</Link>
          </li>
          <li>
            <Link to={`/learning/level/${level}/section/${section}/wordset/2`}>Wordset 2</Link>
          </li>
          <li>
            <Link to={`/learning/level/${level}/section/${section}/wordset/3`}>Wordset 3</Link>
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
