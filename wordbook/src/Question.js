import React, { Component } from 'react';
import Message from './Message';

export default class Question extends Component {
  constructor (props) {
    super(props);
    this.checkCorrect = this.checkCorrect.bind(this);
    this.resetAnswerState = this.resetAnswerState.bind(this);
    this.setValue = this.setValue.bind(this);
    this.state = {
      answered: false,
      correctAnswer: false,
      incorrectAnswer: false,
      value: ''
    };
  }

  checkCorrect (e, correct) {
    e.preventDefault();
    this.setState({ answered: true });
    if (correct === this.state.value) {
      this.setState({ correctAnswer: true });
      this.props.countAnswers('c');
    } else {
      this.setState({ incorrectAnswer: true });
      this.props.countAnswers('i');
    }
  }

  setValue (e) {
    this.setState({ value: e.target.value });
  }

  resetAnswerState () {
    this.setState({ answered: false, correctAnswer: false, incorrectAnswer: false }, this.props.nextQuestion);
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
        {!this.state.answered &&
          <button onClick={(e) => this.checkCorrect(e, correct)}>Check answer</button>
        }
        {this.state.answered &&
          <React.Fragment>
            {this.state.correctAnswer &&
              <Message
                buttonAction={this.resetAnswerState}
                message='correct'
              />
            }
            {this.state.incorrectAnswer &&
              <Message
                buttonAction={this.resetAnswerState}
                message='incorrect'
              />
            }
          </React.Fragment>
        }
      </form>
    );
  }
}
