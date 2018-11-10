import React, { Component } from 'react';
import Question from './Question';

export default class QuizContainer extends Component {
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
      totalQuestions: 0
    };
  }

  // TODO: hardcoded values below for placement quiz
  checkForQuizEnd () {
    if (this.state.incorrectAnswers > 1 || this.state.currentQuestion === this.state.totalQuestions) {
      this.props.toggleQuizFailed();
      this.props.toggleQuizInProgress();
    } else if (this.state.correctAnswers > 8 && this.state.currentQuestion >= this.state.totalQuestions) {
      this.props.toggleQuizInProgress();
      this.props.incrementLevel();
    } else {
      this.nextQuestion();
    }
  }

  componentDidMount () {
    this.startQuiz(this.props.questions.length);
  }

  countAnswers (type) {
    if (type === 'c') {
      this.setState(currentState => (
        { correctAnswers: currentState.correctAnswers + 1 }
      ));
    } else if (type === 'i') {
      this.setState(currentState => (
        { incorrectAnswers: currentState.incorrectAnswers + 1 }
      ));
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
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalQuestions: numQuestions
    });
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
        <Question
          prompt={currentQuestion.prompt}
          answers={currentQuestion.answers}
          correct={currentQuestion.correct}
          countAnswers={this.countAnswers}
          checkForQuizEnd={this.checkForQuizEnd}
        />
      </React.Fragment>
    );
  }
}
