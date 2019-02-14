import React, { Component } from 'react';
import { getPhonetic } from '../API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

export default class Word extends Component {
  constructor (props) {
    super(props);
    this.state = {
      phonetics: []
    };
  }
  componentDidMount () {
    getPhonetic(this.props.definition.word)
      .then(phoneticData => this.setState({ phonetics: phoneticData }));
  }

  componentWillUnmount () {
    this.setState({ phonetics: [] });
  }

  render () {
    const { definition } = this.props;
    console.log(this.state.phonetics.length);
    return (
      <div className='card col-lg mt-3 mt-lg-0 bg-primary text-light wordCard'>
        <div className='card-body'>
          <div className='row'>
            <h3 className='mb-0 col-auto'>{definition.word}</h3>
            <p className='card-text mb-0 col-auto'>{definition.pos}</p>
            <div className='pl-3 pr-3 clickable'>
              <FontAwesomeIcon icon={faVolumeUp} />
            </div>
            {/* follow display rules according to M-W */}
            \{this.state.phonetics.map(phonetic =>
              <p key={phonetic.mw} className='card-text mb-0 col-auto'>
                <span className='font-italic'>{phonetic.l ? phonetic.l : null}</span>
                {phonetic.mw}
                <span className='font-italic'>{phonetic.l2 ? phonetic.l2 : null}</span>
                {(this.state.phonetics.length > 1 && this.state.phonetics.indexOf(phonetic) < this.state.phonetics.length - 1) ? (phonetic.pun || ', ') : null}
              </p>
            )}\
          </div>
          <hr className='bg-secondary' />
          <p className='card-text'>{definition.deftext}</p>
        </div>
      </div>
    );
  }
}
