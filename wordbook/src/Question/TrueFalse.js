import React, { Component } from 'react';
import Input from './Input';

export default class TrueFalse extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  render () {
    return (
      <fieldset onChange={this.changeHandler} className='form-group position-relative'>
        <legend>{this.props.prompt}</legend>
        <div className='form-check form-check-inline'>
          <Input
            option='true'
            prompt={this.props.prompt}
            chosenAnswer={this.props.value}
            showAnswers={this.props.showAnswers}
            correctAnswer={this.props.correctAnswer}
          />
        </div>
        <div className='form-check form-check-inline'>
          <Input
            option='false'
            prompt={this.props.prompt}
            chosenAnswer={this.props.value}
            showAnswers={this.props.showAnswers}
            correctAnswer={this.props.correctAnswer}
          />
        </div>
        {/* show score component on the checked answer */}
        {this.props.children}
      </fieldset>
    );
  }
}
