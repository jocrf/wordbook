import React, { Component } from 'react';
import './index.css';
import QuizContainer from '../QuizContainer.js';
import { get } from '../API/index.js';
import Message from '../Message';

export default class App extends Component {
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
      quizTitle: '',
      quizType: ''
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
        <h1>Welcome to the Wordbook App</h1>
        {!this.state.quizInProgress && this.state.currentLevel === 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            message='readyMessage'
          />
        }
        {!this.state.quizInProgress && this.state.currentLevel !== 0 && !this.state.quizFailed &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            message='quizOverPass'
          />
        }
        {this.state.quizInProgress &&
          <QuizContainer
            incrementLevel={this.incrementLevel}
            instructions={this.state.instructions}
            questions={this.state.quizItems}
            title={this.state.quizTitle}
            toggleQuizFailed={this.toggleQuizFailed}
            toggleQuizInProgress={this.toggleQuizInProgress}
            type={this.state.quizType}
          />
        }
        {this.state.quizFailed &&
          <Message
            message='quizOverFail'
          />
        }
      </React.Fragment>
    );
  }
}
