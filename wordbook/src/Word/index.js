import React, { Component } from 'react';

export default class Word extends Component {
  render () {
    const { definition } = this.props;
    return (
      <div>
        <h3>{definition.word}</h3>
        <p>{definition.pos}</p>
        <p>{definition.phonetic}</p>
        <p>{definition.deftext}</p>
      </div>
    )
  }
}