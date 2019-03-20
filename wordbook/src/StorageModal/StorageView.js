import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class StorageView extends Component {
  render () {
    const { level, section, wordset, exercise } = this.props;
    let prevSessionUrl;
    // build URL step - make sure to handle any undefined keys from storage
    wordset === 'review'
      ? prevSessionUrl = `/learning/level/${level}/section/${section}/review/${exercise}`
      : prevSessionUrl = `/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/${exercise}`;
    return (
      <div>
        <button onClick={this.props.saveProgress}>Save progress</button>
        <Link to={prevSessionUrl}>Restore previous session</Link>
      </div>
    );
  }
}
