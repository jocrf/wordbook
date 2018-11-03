import React, { Component } from 'react';

class Question extends Component {
  constructor (props) {
    super(props);
    this.checkCorrect = this.checkCorrect.bind(this);
    this.setValue = this.setValue.bind(this);
    this.state = {
      value: ''
    }
  }

  checkCorrect (e, correct) {
    e.preventDefault();
    if (correct === this.state.value) {
      this.props.nextQuestion();
    }
  }

  setValue (e) {
    this.setState({ value: e.target.value });
  }

  render () {
    const { prompt, answers, correct } = this.props;
    return (
      <form>
        <fieldset onChange={this.setValue}>
          <legend>{prompt}</legend>
          {answers.map(answer =>
            <label key={answer}>
              <input type='radio' value={answer} name={prompt} key={answer} />
              {answer}
            </label>
          )}
        </fieldset>
        <button onClick={(e) => this.checkCorrect(e, correct)}>Check answer</button>
      </form>
    );
  }
}

export default Question;
