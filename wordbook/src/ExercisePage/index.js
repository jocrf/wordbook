import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';

// TODO will get from database based on props!
// {this.props.level} {this.props.section} {this.props.wordset} {this.props.exercise}
var data = {
  'type': 'placement',
  'questions': [
    {
      'prompt': 'She ESTABLISHED the business.',
      'answers': [
        'announced',
        'bought',
        'sold',
        'improved',
        'set up'
      ],
      'correct': 'set up'
    },
    {
      'prompt': 'Enjoying the EXPEDITION.',
      'answers': [
        'visit',
        'display',
        'journey',
        'boat race',
        'sights'
      ],
      'correct': 'journey'
    },
    {
      'prompt': 'Best way to INSTRUCT.',
      'answers': [
        'forget',
        'teach',
        'learn',
        'punish',
        'build'
      ],
      'correct': 'teach'
    },
    {
      'prompt': 'GNARLED branches.',
      'answers': [
        'old',
        'decorated',
        'smooth',
        'diseased',
        'twisted'
      ],
      'correct': 'twisted'
    },
    {
      'prompt': 'Tried to FLATTER him.',
      'answers': [
        'insult',
        'improve',
        'overpraise',
        'crush',
        'agree with'
      ],
      'correct': 'overpraise'
    },
    {
      'prompt': 'They were EXTERMINATED.',
      'answers': [
        'wiped out',
        'stopped',
        'beaten up',
        'cured',
        'thrown away'
      ],
      'correct': 'wiped out'
    },
    {
      'prompt': 'Began to LAG.',
      'answers': [
        'sink',
        'give up',
        'breathe heavily',
        'fall behind',
        'catch up'
      ],
      'correct': 'fall behind'
    },
    {
      'prompt': 'FATAL blows.',
      'answers': [
        'deadly',
        'soft',
        'natural',
        'first',
        'painful'
      ],
      'correct': 'deadly'
    },
    {
      'prompt': 'Powerful HEX.',
      'answers': [
        'evil',
        'prayer',
        'tool',
        'fear',
        'curse'
      ],
      'correct': 'curse'
    },
    {
      'prompt': 'Clever IMPOSTOR.',
      'answers': [
        'detective',
        'customer',
        'magician',
        'faker',
        'thief'
      ],
      'correct': 'faker'
    }
  ]
};

export default class ExercisePage extends Component {
  constructor (props) {
    super(props);
    this.toggleQuizCompleted = this.toggleQuizCompleted.bind(this);
    this.toggleQuizState = this.toggleQuizState.bind(this);
    this.state = {
      isQuizzing: false,
      quizCompleted: false
    };
  }

  toggleQuizCompleted () {
    this.setState((state) => ({ quizCompleted: !state.quizCompleted }));
  }

  toggleQuizState () {
    this.setState((state) => ({ isQuizzing: !state.isQuizzing }));
  }

  render () {
    return (
      <React.Fragment>
        <h1>Title of exercise</h1>
        <p>Instructions</p>
        <p>Example question, sometimes</p>
        {!this.state.isQuizzing &&
          <NavPanel
            quizCompleted={this.state.quizCompleted}
            toggleQuizState={this.toggleQuizState}
          />
        }
        {this.state.isQuizzing &&
          <Exercise
            questions={data.questions}
            questionType={data.type}
            questionsToShow={data.type === 'placement' ? 1 : null}
            toggleQuizCompleted={this.toggleQuizCompleted}
            toggleQuizState={this.toggleQuizState}
          />
        }
      </React.Fragment>
    );
  }
}
