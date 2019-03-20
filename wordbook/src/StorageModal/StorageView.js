import React, { Component } from 'react';

export default class StorageView extends Component {
  render () {
    return (
      <button onClick={this.props.saveProgress}>Save progress</button>
    );
  }
}
