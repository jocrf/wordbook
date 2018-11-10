import React, { Component } from 'react';
import './index.css';
import QuizContainer from '../QuizContainer.js';
import { get } from '../API/index.js';
import Message from '../Message';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.nextLevel = this.nextLevel.bind(this);
    this.populateQuizData = this.populateQuizData.bind(this);
    this.setUpQuiz = this.setUpQuiz.bind(this);
    this.toggleQuizInProgress = this.toggleQuizInProgress.bind(this);
    this.state = {
      instructions: '',
      currentLevel: 0,
      quizInProgress: false,
      quizItems: [],
      quizTitle: '',
      quizType: ''
    };
  }

  componentDidMount () {
    this.setUpQuiz();
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

  toggleQuizInProgress () {
    this.setState(currentState => (
      { quizInProgress: !currentState.quizInProgress }
    ));
  }

  render () {
    return (
      <React.Fragment>
        <h1>Welcome to the Wordbook App</h1>
        {!this.state.quizInProgress &&
          <Message
            buttonAction={this.toggleQuizInProgress}
            message='readyMessage'
          />
        }
        {this.state.quizInProgress &&
          <QuizContainer
            instructions={this.state.instructions}
            nextLevel={this.nextLevel}
            questions={this.state.quizItems}
            title={this.state.quizTitle}
            toggleQuizInProgress={this.toggleQuizInProgress}
            type={this.state.quizType}
            quizzing={this.state.quizInProgress}
          />
        }
      </React.Fragment>
    );
  }
}
