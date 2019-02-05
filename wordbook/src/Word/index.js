import React, { Component } from 'react';

export default class Word extends Component {
  render () {
    const { definition } = this.props;
    return (
      <div className='card col-lg-8 bg-primary text-light'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='mb-0 col-auto'>{definition.word}</h3>
            <p className='card-text mb-0 col-auto'>{definition.pos}</p>
            <p className='card-text mb-0 col-auto'>{definition.phonetic}</p>
          </div>
          <hr className='bg-secondary'></hr>
          <p className='card-text'>{definition.deftext}</p>
        </div>
      </div>
    )
  }
}