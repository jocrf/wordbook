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

  // TODO: track number of correct and incorrect questions, check if quiz should be over or continue to next level

  nextQuestion () {
    if (this.state.currentQuestion < this.state.totalQuestions) {
      this.setState(currentState => (
        { currentQuestion: currentState.currentQuestion + 1 }
      ));
    }
  }

  startQuiz (numQuestions) {
    this.setState({ takingQuiz: true, totalQuestions: numQuestions })
  }

  render () {
    const { instructions, questions, title, type } = this.props;
    const currentQuestion = questions[this.state.currentQuestion];
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
            prompt={currentQuestion.prompt}
            answers={currentQuestion.answers}
            correct={currentQuestion.correct}
            nextQuestion={this.nextQuestion}
          />
        }
      </React.Fragment>
    )
  }
}

export default QuizContainer;
