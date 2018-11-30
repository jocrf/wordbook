import React, { Component } from 'react';
import QuizContainer from '../QuizContainer/index';
import PlacementQuizContainer from '../PlacementQuizContainer/index';
import { Route, Link } from 'react-router-dom';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.incrementExercise = this.incrementExercise.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.state = {
      currentLevel: 0,
      currentExercise: 0
    };
  }

  incrementExercise () {
    this.setState(currentState => (
      { currentExercise: currentState.currentExercise + 1 }
    ));
  }

  incrementLevel () {
    this.setState(currentState => (
      { currentLevel: currentState.currentLevel + 1 }
    ));
  }

  render () {
    return (
      <React.Fragment>
        <h1>Welcome to the Wordbook App</h1>
        <Route exact path='/'>
          <Link to='/'>Home</Link>
        </Route>
        {this.state.currentLevel === 0 &&
          <Link to='placement'>Take the placement test</Link>
        }
        <Route
          path='/placement'
          render={(props) => <PlacementQuizContainer {...props} currentLevel={this.state.currentLevel} currentExercise={this.state.currentExercise} incrementLevel={this.incrementLevel} incrementExercise={this.incrementExercise} />}
        />
        {this.state.currentLevel > 0 &&
          <Link to='quiz'>Start learning</Link>
        }
        <Route
          path='quiz'
          render={(props) => <QuizContainer {...props} currentLevel={this.state.currentLevel} currentExercise={this.state.currentExercise} incrementLevel={this.incrementLevel} incrementExercise={this.incrementExercise} />}
        />
      </React.Fragment>
    );
  }
}
