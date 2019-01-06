import React, { Component } from 'react';

export default class NavPanel extends Component {
  render () {
    return (
      <React.Fragment>
        <p>Ready to start?</p>
        <button onClick={this.props.toggleQuizState}>Ready</button>
      </React.Fragment>
    );
  }
}
