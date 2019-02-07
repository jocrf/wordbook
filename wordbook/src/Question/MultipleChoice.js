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
    if (this.props.placement && prevProps.prompt !== this.props.prompt) {
      if (!prevProps.correct) {
        this.props.markWrongAnswers();
      }
    }
  }

  render () {
    const { answers, prompt } = this.props;
    return (
      <React.Fragment>
        <fieldset onChange={this.changeHandler} className='form-group'>
          <legend>{prompt}</legend>
          {answers.map(answer =>
            <div key={answer} className='form-check'>
              <input type='radio' id={answer} value={answer} name={prompt} checked={answer === this.props.value} required />
              <label htmlFor={answer} className='btn btn-outline-primary'>
                {answer}
              </label>
              {/* show score component on the checked answer */}
              {answer === this.props.value && this.props.children}
            </div>
          )}
        </fieldset>
      </React.Fragment>
    );
  }
}
