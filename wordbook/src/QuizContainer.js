import React, { Component } from 'react';
import Question from './Question.js';

class QuizContainer extends Component {
  constructor (props) {
    super(props);
    this.checkForQuizEnd = this.checkForQuizEnd.bind(this);
    this.countAnswers = this.countAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.state = {
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      takingQuiz: false,
      totalQuestions: 0,
      quizOver: false
    };
  }

  // TODO: hardcoded values below for placement quiz
  checkForQuizEnd () {
    if (this.state.correctAnswers > 8 || this.state.incorrectAnswers > 1 || this.state.currentQuestion === this.state.totalQuestions) {
      this.setState({ quizOver: true });
      console.log('quiz is over');
    } else {
      console.log('quiz is not over');
    }
  }

  countAnswers (type) {
    if (type === 'c') {
      this.setState(currentState => (
        { correctAnswers: currentState.correctAnswers + 1 }
      ), this.checkForQuizEnd);
    } else if (type === 'i') {
      this.setState(currentState => (
        { incorrectAnswers: currentState.incorrectAnswers + 1 }
      ), this.checkForQuizEnd);
    }
  }

  nextQuestion () {
    if (this.state.currentQuestion < this.state.totalQuestions) {
      this.setState(currentState => (
        { currentQuestion: currentState.currentQuestion + 1 }
      ));
    }
  }

  startQuiz (numQuestions) {
    this.setState({ takingQuiz: true, totalQuestions: numQuestions });
  }

  // TODO: add type into render method for quiz type

  render () {
    const { instructions, questions, title } = this.props;
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
            countAnswers={this.countAnswers}
          />
        }
      </React.Fragment>
    );
  }
}

export default QuizContainer;
