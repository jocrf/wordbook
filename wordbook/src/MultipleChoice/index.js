import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  componentDidUpdate (prevProps) {
    console.log(this.props.placement);
    if (this.props.placement && prevProps.prompt !== this.props.prompt) {
      if (!prevProps.correct) {
        this.props.markWrongAnswers();
      }
    }
  }

  render () {
    const { answers, prompt } = this.props;
    return (
      <fieldset onChange={this.changeHandler} className='form-group'>
        <legend>{prompt}</legend>
        {answers.map(answer =>
          <div className='form-check'>
            <input type='radio' id={answer} value={answer} name={prompt} required />
            <label key={answer} for={answer} className='btn btn-outline-primary'>
              {answer}
            </label>
          </div>
        )}
      </fieldset>
    );
  }
}
