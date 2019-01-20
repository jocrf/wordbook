import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';
import { getExercise, getPlacement } from '../API';

// {this.props.level} {this.props.section} {this.props.wordset} {this.props.exercise}

export default class ExercisePage extends Component {
  constructor (props) {
    super(props);
    this.onQuizCompleted = this.onQuizCompleted.bind(this);
    this.populateData = this.populateData.bind(this);
    this.toggleQuizState = this.toggleQuizState.bind(this);
    this.state = {
      chapter: {},
      isQuizzing: false,
      quizCompleted: false
    };
  }

  componentDidMount () {
    this.populateData();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.exercise !== this.props.exercise) {
      this.setState({ isQuizzing: false, quizCompleted: false });
      this.populateData();
    }
  }

  onQuizCompleted () {
    this.setState({ quizCompleted: true, isQuizzing: false });
  }

  populateData () {
    if (this.props.placement) {
      return getPlacement(this.props.exercise)
        .then(data => this.setState({ chapter: data }));
    }
    const { level, section, wordset, exercise, review } = this.props;
    getExercise(level, section, wordset, exercise, review)
      .then(data => this.setState({ chapter: data }));
  }

  toggleQuizState () {
    this.setState((state) => ({ isQuizzing: !state.isQuizzing }));
  }

  render () {
    return (
      <React.Fragment>
        {!this.state.isQuizzing &&
          <NavPanel
            level={this.props.level}
            wordset={this.props.wordset}
            section={this.props.section}
            exercise={this.props.exercise}
            review={this.props.review}
            quizCompleted={this.state.quizCompleted}
            toggleQuizState={this.toggleQuizState}
          />
        }
        {this.state.isQuizzing &&
          <React.Fragment>
            {/* TODO: get below info dynamically */}
            <h1>Title of exercise</h1>
            <p>Instructions</p>
            <p>Example question, sometimes</p>
            <Exercise
              definitions={this.state.chapter.definitions}
              questions={this.state.chapter.questions}
              questionType={this.state.chapter.type}
              questionsToShow={this.state.chapter.type === 'mc-one' || this.state.chapter.type === 'fitb' ? 1 : null}
              wordlist={this.state.chapter.wordList}
              onQuizCompleted={this.onQuizCompleted}
              toggleQuizState={this.toggleQuizState}
              markWrongAnswers={this.props.markWrongAnswers}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
