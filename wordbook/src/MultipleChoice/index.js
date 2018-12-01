import React, { Component } from 'react';

export default class MultipleChoice extends Component {
  constructor (props) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.state = {
      chosenAnswer: ''
    };
  }

  componentDidUpdate () {
    if (this.state.chosenAnswer === this.props.correctAnswer) {
      console.log('correct');
    }
  }

  setValue (e) {
    this.setState({ chosenAnswer: e.target.value });
  }

  render () {
    const { answers, prompt } = this.props;
    return (
      <fieldset onChange={this.setValue}>
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
