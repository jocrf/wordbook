import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';

export default class LearningPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentLevel: 1, // hard-coded for now, will want to get from storage
      currentWordset: 1,
      currentExercise: 1
    };
  }

  render () {
    return (
      <React.Fragment>
        <Route exact path='/learning' render={() => (
          <React.Fragment>
            <p>The current level is {this.state.currentLevel}</p>
            <p>You are on wordset {this.state.currentWordset}, exercise {this.state.currentExercise}</p>
            <p>Are you ready to keep learning?</p>
            <Link to={`/learning/level/${this.state.currentLevel}/wordset/${this.state.currentWordset}/exercise/${this.state.currentExercise}`}>Yes</Link>
          </React.Fragment>
        )} />
        <Route path='/learning/level/:level/wordset/:wordset/exercise/:exercise' component={ExercisePage} />
        {/* render overview of levels/chapters like a table of contents if they want to review rather than learn */}
      </React.Fragment>
    );
  }
}
