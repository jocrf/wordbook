import React, { Component } from 'react';
import Exercise from '../Exercise';

var data = {
  'type': 'tf',
  'questions': [
    {
      'prompt': 'Do other things besides food DECAY?',
      'word': 'DECAY',
      'correct': 'true'
    },
    {
      'prompt': 'Do most people like to be MISERABLE?',
      'word': 'MISERABLE',
      'correct': 'false'
    },
    {
      'prompt': 'Do the leaves of trees TREMBLE when the wind blows through them?',
      'word': 'TREMBLE',
      'correct': 'true'
    },
    {
      'prompt': 'Is an Olympic gold medal a TROPHY?',
      'word': 'TROPHY',
      'correct': 'true'
    },
    {
      'prompt': 'Are governors ELECTED?',
      'word': 'ELECT',
      'correct': 'true'
    },
    {
      'prompt': 'Are some people TERRIFIED of the dark?',
      'word': 'TERRIFY',
      'correct': 'true'
    },
    {
      'prompt': 'Are all TERRITORIES the same size?',
      'word': 'TERRITORY',
      'correct': 'false'
    },
    {
      'prompt': 'If you take frozen food out of the freezer, will it THAW?',
      'word': 'THAW',
      'correct': 'true'
    },
    {
      'prompt': 'Do people usually say \'Hello\' when they DEPART?',
      'word': 'DEPART',
      'correct': 'false'
    },
    {
      'prompt': 'Do people usually HOLLER in the library?',
      'word': 'HOLLER',
      'correct': 'false'
    },
    {
      'prompt': 'Are people who are watching a baseball game PARTICIPATING in it?',
      'word': 'PARTICIPATE',
      'correct': 'false'
    },
    {
      'prompt': 'Is someone who learns a language in a few months a RAPID learner?',
      'word': 'RAPID',
      'correct': 'true'
    },
    {
      'prompt': 'Would a store usually REFUND your money if you returned an item that you',
      'word': 'REFUND',
      'correct': 'false'
    },
    {
      'prompt': 'had broken?',
      'word': 'RESPONSE',
      'correct': 'true'
    },
    {
      'prompt': 'Can a wink be a RESPONSE?',
      'word': 'SCORCH',
      'correct': 'true'
    },
    {
      'prompt': 'Can a piece of paper be SCORCHED?'
    }
  ]
};

export default class ExercisePage extends Component {
  render () {
    console.log(this.props);
    return (
      // maybe has nav
      <React.Fragment>
        <h1>Title of exercise</h1>
        <p>Instructions</p>
        <p>Example question, sometimes</p>
        <Exercise questions={data.questions} questionType={data.type} />
      </React.Fragment>
    );
  }
}
