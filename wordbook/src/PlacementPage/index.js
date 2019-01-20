import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';

export default class PlacementPage extends Component {
  constructor (props) {
    super(props);
    this.markWrongAnswers = this.markWrongAnswers.bind(this);
    this.state = {
      group: 0,
      wrongAnswers: 0
    };
  }

  markWrongAnswers () {
    console.log('marking answer wrong');
    this.setState((prevState) => ({ wrongAnswers: prevState.wrongAnswers + 1 }));
  }

  render () {
    return (
      <React.Fragment>
        <Link to={`/placement/${this.state.group}`}>Begin</Link>
        <Route
          path='/placement/:group'
          render={({ match }) => <ExercisePage
            exercise={match.params.group}
            placement='true'
            markWrongAnswers={this.markWrongAnswers}
          />}
        />
      </React.Fragment>
    );
  }
}
