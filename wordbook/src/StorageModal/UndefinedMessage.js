import React, { Component } from 'react';

export default class UndefinedMessage extends Component {
  render () {
    return (
      <div className='card card-body'>
        <p className='card-text'>Progress cannot be saved unless you are currently in an exercise.</p>
        <button className='btn btn-orange w-50' onClick={this.props.unsetMessage}>Close</button>
      </div>
    );
  }
}
