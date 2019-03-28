import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';

export default class PlacementPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Route
          path='/placement/:group?'
          render={({ match }) => <ExercisePage
            exercise={+match.params.group - 1} // for exercise and question components
            group={+match.params.group - 1} // for nav panel
            placement='true'
          />}
        />
      </React.Fragment>
    );
  }
}
