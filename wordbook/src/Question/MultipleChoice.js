import React, { Component } from 'react';
import Input from './Input';
import Score from '../Score';
import Word from '../Word';

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
          <legend onClick={this.props.toggleDefinition}>{prompt}</legend>
          {this.props.showDefinition &&
            <Word definition={this.props.definition} />
          }
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
              {this.props.showAnswers && (option === value) &&
                <Score
                  chosenAnswer={this.props.value}
                  correctAnswer={this.props.correctAnswer}
                />
              }
            </div>
          )}
        </fieldset>
      </React.Fragment>
    );
  }
}
