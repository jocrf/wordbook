import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';
import { getExercise, getInstructions, getPlacement } from '../API';

// {this.props.level} {this.props.section} {this.props.wordset} {this.props.exercise}

// TODO: implement showDefinition method - by default on exercise 0, optionally to click on word for other exercises

export default class ExercisePage extends Component {
  constructor (props) {
    super(props);
    this.onQuizCompleted = this.onQuizCompleted.bind(this);
    this.populateData = this.populateData.bind(this);
    this.toggleQuizState = this.toggleQuizState.bind(this);
    this.state = {
      chapter: {},
      instructions: {},
      isQuizzing: false,
      quizCompleted: false
    };
  }

  componentDidMount () {
    this.populateData();
    if (this.props.toggleToC) {
      this.props.toggleToC();
    }
  }

  componentWillUnmount () {
    if (this.props.toggleToC) {
      this.props.toggleToC();
    }
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
    const { level, section, wordset, exercise, review, placement } = this.props;
    getInstructions(exercise, review, placement)
      .then(instructions => this.setState({ instructions: instructions }));
    if (placement) {
      this.props.resetAnswers();
      return getPlacement(exercise)
        .then(data => this.setState({ chapter: data }));
    }
    getExercise(level, section, wordset, exercise, review)
      .then(data => this.setState({ chapter: data }));
  }

  toggleQuizState () {
    this.setState((state) => ({ isQuizzing: !state.isQuizzing }));
  }

  render () {
    return (
      <section className='card'>
        <div className='card-body'>
          {!this.state.isQuizzing &&
            <NavPanel
              level={this.props.level}
              wordset={this.props.wordset}
              section={this.props.section}
              exercise={this.props.exercise}
              group={this.props.group}
              passed={this.props.passed}
              review={this.props.review}
              quizCompleted={this.state.quizCompleted}
              toggleQuizState={this.toggleQuizState}
              placement={this.props.placement}
              instructions={this.state.instructions}
            />
          }
          {this.state.isQuizzing &&
            <React.Fragment>
              <h1 className='card-title'>{this.state.instructions.title}</h1>
              {!this.props.placement &&
                <h2 className='card-title'>Level {this.props.level}, Section  {this.props.section}, Wordset {this.props.wordset}</h2>
              }
              {this.state.instructions.example &&
                <React.Fragment>
                  <h2>Example:</h2>
                  <p className='card-text'>{this.state.instructions.example}</p>
                  <p className='card-text'>{this.state.instructions['example-answer']}</p>
                </React.Fragment>
              }
              <div className='row'>
                <Exercise
                  definitions={this.state.chapter.definitions}
                  questions={this.state.chapter.exercise.questions}
                  questionType={this.state.chapter.exercise.type}
                  questionsToShow={this.state.chapter.exercise.type === 'mc-one' || this.state.chapter.exercise.type === 'fitb' ? 1 : null}
                  wordlist={this.state.chapter.exercise.wordList}
                  onQuizCompleted={this.onQuizCompleted}
                  toggleQuizState={this.toggleQuizState}
                  markWrongAnswers={this.props.markWrongAnswers}
                  placement={this.props.placement}
                />
              </div>
            </React.Fragment>
          }
        </div>
      </section>
    );
  }
}
