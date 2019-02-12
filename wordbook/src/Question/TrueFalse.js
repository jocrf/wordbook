import React, { Component } from 'react';
import Input from './Input';
import Score from '../Score';
import Word from '../Word';

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
        <legend onClick={this.props.toggleDefinition} className={this.props.showAnswers && 'clickable'}>{this.props.prompt}</legend>
        {this.props.showDefinition &&
          <Word definition={this.props.definition} />
        }
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
        {this.props.showAnswers &&
          <Score
            chosenAnswer={this.props.value}
            correctAnswer={this.props.correctAnswer}
          />
        }
      </fieldset>
    );
  }
}
