import React, { Component } from 'react';
import Input from './Input';

export default class MultipleChoice extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  componentDidUpdate (prevProps) {
    if (this.props.placement && prevProps.prompt !== this.props.prompt) {
      if (!prevProps.correct) {
        this.props.markWrongAnswers();
      }
    }
  }

  render () {
    const { options, prompt, value } = this.props;
    return (
      <React.Fragment>
        <fieldset onChange={this.changeHandler} className='form-group'>
          <legend>{prompt}</legend>
          {options.map(option =>
            <div key={option} className='form-check'>
              <Input
                option={option}
                prompt={prompt}
                chosenAnswer={value}
                showAnswers={this.props.showAnswers}
                correctAnswer={this.props.correctAnswer}
              />
              {/* show score component on the checked answer */}
              {(option === this.props.value) && this.props.children}
            </div>
          )}
        </fieldset>
      </React.Fragment>
    );
  }
}
