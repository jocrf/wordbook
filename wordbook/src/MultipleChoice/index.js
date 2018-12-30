import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  render () {
    const { answers, prompt } = this.props;
    return (
      <fieldset onChange={this.changeHandler}>
        <legend>{prompt}</legend>
        {answers.map(answer =>
          <label key={answer}>
            <input type='radio' value={answer} name={prompt} required />
            {answer}
          </label>
        )}
      </fieldset>
    );
  }
}
