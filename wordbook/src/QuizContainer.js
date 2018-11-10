import React, { Component } from 'react';
import Question from './Question';
import Message from './Message';

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
      this.props.toggleQuizInProgress();
      console.log('quiz is over');
    } else if (this.state.correctAnswers > 8 && this.state.currentQuestion === this.state.totalQuestions) {
      this.props.toggleQuizInProgress();
    } else {
      console.log('quiz is not over');
    }
  }

  componentDidMount () {
    this.startQuiz(this.props.questions.length);
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
    this.setState({ totalQuestions: numQuestions });
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
        {this.props.quizzing &&
          <Question
            prompt={currentQuestion.prompt}
            answers={currentQuestion.answers}
            correct={currentQuestion.correct}
            nextQuestion={this.nextQuestion}
            countAnswers={this.countAnswers}
          />
        }
        {!this.props.quizzing && this.state.correctAnswers > 8 &&
          <React.Fragment>
            <Message
              buttonAction={this.props.nextLevel}
              message='quizInProgressPass'
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
