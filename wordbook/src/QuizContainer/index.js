import React, { Component } from 'react';
import './index.css';
import Quiz from '../Quiz.js';
import { get } from '../API/index.js';
import Message from '../Message';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.populateQuizData = this.populateQuizData.bind(this);
    this.setUpQuiz = this.setUpQuiz.bind(this);
    this.toggleQuizFailed = this.toggleQuizFailed.bind(this);
    this.toggleQuizInProgress = this.toggleQuizInProgress.bind(this);
    this.state = {
      instructions: '',
      currentLevel: 0,
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
    if (this.state.currentLevel !== prevState.currentLevel) {
      this.setUpQuiz();
    }
  }

  /* add componentDidUnmount to reset state when quizzes change - IF quiz is complete - and to pass up state to the App */

  incrementLevel () {
    this.setState(currentState => (
      { currentLevel: currentState.currentLevel + 1 }
    ));
  }

  nextLevel () {
    this.setState(currentState => (
      { currentLevel: currentState.currentLevel + 1 }
    ), this.setUpQuiz);
  }

  populateQuizData (quizData) {
    const level = this.state.currentLevel;
    this.setState({
      instructions: quizData.instructions,
      quizItems: quizData.groups[level].questions,
      quizTitle: quizData.groups[level].title,
      quizType: quizData.type
    });
  }

  setUpQuiz () {
    get('placement')
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
        {!this.state.quizInProgress && this.state.currentLevel === 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            message='readyMessage'
          />
        }
        {!this.state.quizInProgress && this.state.currentLevel !== 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            level={this.state.currentLevel}
            message='quizOverPass'
          />
        }
        {this.state.quizInProgress &&
          <Quiz
            incrementLevel={this.incrementLevel}
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
            level={this.state.currentLevel}
            message='quizOverFail'
          />
        }
      </React.Fragment>
    );
  }
}
