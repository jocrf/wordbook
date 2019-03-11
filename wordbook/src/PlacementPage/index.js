import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';

export default class PlacementPage extends Component {
  constructor (props) {
    super(props);
    this.markWrongAnswers = this.markWrongAnswers.bind(this);
    this.resetAnswers = this.resetAnswers.bind(this);
    this.state = {
      wrongAnswers: 0
    };
  }

  markWrongAnswers () {
    console.log('wrong answer');
    this.setState((prevState) => ({ wrongAnswers: prevState.wrongAnswers + 1 }));
  }

  resetAnswers () {
    this.setState({ wrongAnswers: 0 });
  }

  render () {
    return (
      <React.Fragment>
        <Route
          path='/placement/:group?'
          render={({ match }) => <ExercisePage
            passed={this.state.wrongAnswers < 2 ? 'pass' : null}
            exercise={+match.params.group - 1} // for exercise and question components
            group={+match.params.group - 1} // for nav panel
            placement='true'
            markWrongAnswers={this.markWrongAnswers}
            resetAnswers={this.resetAnswers}
          />}
        />
      </React.Fragment>
    );
  }
}
