import React, { Component } from 'react';
import Question from './Question.js';

class QuizContainer extends Component {
  constructor (props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.state = {
      currentQuestion: 0,
      takingQuiz: false,
      totalQuestions: 0
    }
  }

  nextQuestion () {
    if (this.state.currentQuestion < this.state.totalQuestions) {
      this.setState(function (currentState) {
        return {
          currentQuestion: currentState.currentQuestion + 1
        }
      });
    }
  }

  startQuiz (numQuestions) {
    this.setState({ takingQuiz: true, totalQuestions: numQuestions })
  }

  render () {
    const { instructions, questions, title, type } = this.props;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h2>Instructions</h2>
        <p>{instructions}</p>
        {!this.state.takingQuiz &&
          <React.Fragment>
            <p>Are you ready to start?</p>
            <button onClick={() => this.startQuiz(questions.length)}>Yes!</button>
          </React.Fragment>
        }
        {this.state.takingQuiz &&
          <Question
            prompt={questions[this.state.currentQuestion].prompt}
            answers={questions[this.state.currentQuestion].answers}
            correct={questions[this.state.currentQuestion].correct}
            nextQuestion={this.nextQuestion}
          />
        }
      </React.Fragment>
    )
  }
}

export default QuizContainer;
