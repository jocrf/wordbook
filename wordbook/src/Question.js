import React, { Component } from 'react';

class Question extends Component {
  constructor (props) {
    super(props);
    this.checkCorrect = this.checkCorrect.bind(this);
    this.setValue = this.setValue.bind(this);
    this.showCorrect = this.showCorrect.bind(this);
    this.state = {
      correctAnswer: false,
      value: ''
    }
  }

  checkCorrect (e, correct) {
    e.preventDefault();
    if (correct === this.state.value) {
      this.setState(function(current) {
        return {
          correctAnswer: true
        }
      }, this.showCorrect);
    }
  }

  setValue (e) {
    this.setState({ value: e.target.value });
  }

  showCorrect () {
    const self = this;
    window.setTimeout(function () {
      self.setState({ correctAnswer: false });
      self.props.nextQuestion();
    }, 1000);
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
        {!this.state.correctAnswer &&
          <button onClick={(e) => this.checkCorrect(e, correct)}>Check answer</button>
        }
        {this.state.correctAnswer &&
          <p>correct!</p>
        }
      </form>
    );
  }
}

export default Question;
