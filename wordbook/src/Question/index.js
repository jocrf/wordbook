import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import TrueFalse from '../TrueFalse';
import FillInTheBlank from '../FillInTheBlank';

export default class Question extends Component {
  render() {
    switch(this.props.type) {
      case 'mc-all':
      case 'mc-one':
        return <MultipleChoice {...this.props} />;
      case 'tf':
        return <TrueFalse {...this.props} />;
      case 'fitb':
        return <FillInTheBlank {...this.props} />;
      default:
        return console.log('unexpected prop type');
    }
  }
}