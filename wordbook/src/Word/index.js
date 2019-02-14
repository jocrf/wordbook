import React, { Component } from 'react';
import { getPhonetic } from '../API';

export default class Word extends Component {
  constructor (props) {
    super(props);
    this.state = {
      phonetic: []
    };
  }
  componentDidMount () {
    getPhonetic(this.props.definition.word)
      .then(phoneticData => this.setState({ phonetic: phoneticData }));
  }

  componentWillUnmount () {
    this.setState({ phonetic: [] });
  }

  render () {
    const { definition } = this.props;
    return (
      <div className='card col-lg mt-3 mt-lg-0 bg-primary text-light wordCard'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='mb-0 col-auto'>{definition.word}</h3>
            <p className='card-text mb-0 col-auto'>{definition.pos}</p>
            <p className='card-text mb-0 col-auto'>{definition.phonetic}</p>
          </div>
          <hr className='bg-secondary' />
          <p className='card-text'>{definition.deftext}</p>
        </div>
      </div>
    );
  }
}
