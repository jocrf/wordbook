import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';

export default class PlacementPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      group: 0
    };
  }

  render () {
    return (
      <React.Fragment>
        <Link to={`/placement/${this.state.group}`}>Begin</Link>
        <Route
          path='/placement/:group'
          render={({ match }) => <ExercisePage
            group={match.params.group}
            placement='true'
          />}
        />
      </React.Fragment>
    );
  }
}
