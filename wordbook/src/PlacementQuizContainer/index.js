import React, { Component } from 'react';
import './index.css';
import Quiz from '../Quiz.js';
import { get } from '../API/index.js';
import Message from '../Message';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.populateQuizData = this.populateQuizData.bind(this);
    this.setUpQuiz = this.setUpQuiz.bind(this);
    this.toggleQuizFailed = this.toggleQuizFailed.bind(this);
    this.toggleQuizInProgress = this.toggleQuizInProgress.bind(this);
    this.state = {
      instructions: '',
      quizFailed: false,
      quizInProgress: false,
      quizItems: [],
      quizTitle: ''
    };
  }

  componentDidMount () {
    this.setUpQuiz();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.currentExercise !== prevProps.currentExercise) {
      this.setUpQuiz();
    }
  }

  /* add componentDidUnmount to reset state when quizzes change - IF quiz is complete - and to pass up state to the App */

  populateQuizData (quizData) {
    const level = this.props.currentExercise;
    this.setState({
      instructions: quizData.instructions,
      quizItems: quizData.groups[level].questions,
      quizTitle: quizData.groups[level].title,
      quizType: quizData.type
    });
  }

  setUpQuiz () {
    const level = this.props.currentLevel;
    get(level)
      .then(results => this.populateQuizData(results.placementquiz));
  }

  toggleQuizFailed () {
    this.setState(currentState => (
      { quizFailed: !currentState.quizFailed }
    ));
  }

  toggleQuizInProgress () {
    this.setState(currentState => (
      { quizInProgress: !currentState.quizInProgress }
    ));
  }

  render () {
    return (
      <React.Fragment>
        {/* {TODO: create stats component to show progress <Stats /> */}
        {!this.state.quizInProgress && this.props.currentExercise === 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            message='readyMessage'
          />
        }
        {!this.state.quizInProgress && this.props.currentExercise !== 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            level={this.props.currentExercise}
            message='quizOverPass'
          />
        }
        {this.state.quizInProgress &&
          <Quiz
            incrementLevel={this.props.incrementExercise}
            instructions={this.state.instructions}
            questions={this.state.quizItems}
            title={this.state.quizTitle}
            toggleQuizFailed={this.toggleQuizFailed}
            toggleQuizInProgress={this.toggleQuizInProgress}
            quizType={this.props.quizType}
          />
        }
        {this.state.quizFailed &&
          <Message
            level={this.props.currentExercise}
            message='quizOverFail'
          />
        }
      </React.Fragment>
    );
  }
}