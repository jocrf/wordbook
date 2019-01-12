import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';

// TODO will get from database based on props!
// {this.props.level} {this.props.section} {this.props.wordset} {this.props.exercise}
var data = {
  'type': 'review',
  'wordList': [
    'quivered',
    'smudges',
    'depart'
  ],
  'questions': [
    {
      'part1': 'His han....',
      'part2': 'with nervousness as he tried to put the key in the lock.',
      'answer': 'quivered'
    },
    {
      'part1': 'The dirty eraser made all kinds of',
      'part2': 'on the clean paper.',
      'answer': 'smudges'
    },
    {
      'part1': 'When it was time to.',
      'part2': 'we got in the car and drove away.',
      'answer': 'depart'
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
            <h1>Title of exercise</h1>
            <p>Instructions</p>
            <p>Example question, sometimes</p>
            <Exercise
              questions={data.questions}
              questionType={data.type}
              questionsToShow={data.type === 'placement' ? 1 : null}
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
