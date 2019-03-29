import React, { Component } from 'react';

export default class Message extends Component {
  render () {
    return (
      <div className='card card-body'>
        <p className='card-text'>{this.props.messageText}</p>
      </div>
    );
  }
}
