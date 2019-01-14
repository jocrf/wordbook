import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';

// TODO will get from database based on props!
// {this.props.level} {this.props.section} {this.props.wordset} {this.props.exercise}
var data = {
  'type': 'tf',
  'questions': [
    {
      'prompt': 'Mary tried to IMITATE her older sister in everything she did.',
      'word': 'IMITATE',
      'correct': 'true'
    },
    {
      'prompt': 'He SQUIRMED with displeasure whenever someone called him by his real     name.',
      'word': 'SQUIRM',
      'correct': 'true'
    },
    {
      'prompt': 'We chatted SOCIABLY for a while over a cup of tea.',
      'word': 'SOCIABLE',
      'correct': 'true'
    },
    {
      'prompt': 'He received several awards for his ACHIEVEMENTS in science.',
      'word': 'ACHIEVE',
      'correct': 'true'
    }
  ]
};

export default class ExercisePage extends Component {
  constructor (props) {
    super(props);
    this.onQuizCompleted = this.onQuizCompleted.bind(this);
    this.toggleQuizState = this.toggleQuizState.bind(this);
    this.state = {
      isQuizzing: false,
      quizCompleted: false
    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps.exercise !== this.props.exercise) {
      this.setState({ isQuizzing: false, quizCompleted: false });
    }
  }

  onQuizCompleted () {
    this.setState({ quizCompleted: true, isQuizzing: false });
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
              questions={data.questions}
              questionType={data.type}
              questionsToShow={data.type === 'placement' || data.type === 'review' ? 1 : null}
              wordlist={data.wordList}
              onQuizCompleted={this.onQuizCompleted}
              toggleQuizState={this.toggleQuizState}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
