import React, { Component } from 'react';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import FillInTheBlank from './FillInTheBlank';

export default class Question extends Component {
  constructor (props) {
    super(props);
    this.toggleDefinition = this.toggleDefinition.bind(this);
    this.state = {
      showDefinition: false
    };
  }

  toggleDefinition (prevState) {
    console.log('clicked');
    this.setState(prevState => ({ showDefinition: !prevState.showDefinition }));
  }

  render () {
    switch (this.props.type) {
      case 'mc-all':
      case 'mc-one':
        return <MultipleChoice
          showDefinition={this.state.showDefinition}
          toggleDefinition={this.toggleDefinition}
          {...this.props}
        />;
      case 'tf':
        return <TrueFalse
          showDefinition={this.state.showDefinition}
          toggleDefinition={this.toggleDefinition}
          {...this.props}
        />;
      case 'fitb':
        return <FillInTheBlank
          showDefinition={this.state.showDefinition}
          toggleDefinition={this.toggleDefinition}
          {...this.props}
        />;
      default:
        throw new Error(`unexpected question type: ${this.props.type}`);
    }
  }
}
