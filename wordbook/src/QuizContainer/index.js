import React, { Component } from 'react';
import './index.css';
import Quiz from '../Quiz.js';
import { get } from '../API/index.js';

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.populateQuizData = this.populateQuizData.bind(this);
    this.setUpQuiz = this.setUpQuiz.bind(this);
    this.toggleQuizFailed = this.toggleQuizFailed.bind(this);
    this.toggleQuizInProgress = this.toggleQuizInProgress.bind(this);
    this.state = {
      instructions: '',
      quizInProgress: false,
      quizItems: [],
      quizTitle: ''
    };
  }

  componentDidMount () {
    this.setUpQuiz();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.currentChapter !== prevProps.currentChapter) {
      this.setUpQuiz();
    }
  }

  /* add componentDidUnmount to reset state when quizzes change - IF quiz is complete - and to pass up state to the App */

  populateQuizData (quizData) {
    const level = this.props.currentChapter;
    this.setState({
      instructions: quizData.instructions,
      quizItems: quizData.groups[level].questions,
      quizTitle: quizData.groups[level].title,
      quizType: quizData.type
    });
  }

  setUpQuiz () {
    const level = this.props.currentLevel;
    const chapter = this.props.currentChapter;
    get(level, chapter)
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
        {/* {TODO: create stats component to show progress <Stats /> */}
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
      </React.Fragment>
    );
  }
}
