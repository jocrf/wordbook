import React, { Component } from 'react';

export default class UndefinedMessage extends Component {
  render () {
    return (
      <div>
        <p>Progress cannot be saved unless you are currently in an exercise.</p>
        <button onClick={this.props.unsetMessage}>Close</button>
      </div>
    );
  }
}
