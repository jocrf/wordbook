import React, { Component } from 'react';
import Exercise from '../Exercise';

var data = {
  'type': 'tf',
  'questions': [
    {
      'tfprompt': 'Do flowers WILT if it doesn\'t rain for a long time?',
      'answer': true
    },
    {
      'tfprompt': 'If you go to watch a football game, are you a SPECTATOR?',
      'answer': true
    },
    {
      'tfprompt': 'Are rocks DURABLE?',
      'answer': true
    },
    {
      'tfprompt': 'Would a curving road be a DIRECT route between two places?',
      'answer': false
    },
    {
      'tfprompt': 'Can catsup TRICKLE?',
      'answer': false
    },
    {
      'tfprompt': 'Would Los Angeles be CONSIDERED a large city?',
      'answer': true
    },
    {
      'tfprompt': 'Does a diver PLUNGE into the water?',
      'answer': true
    },
    {
      'tfprompt': 'Are DELEGATES sometimes elected?',
      'answer': true
    },
    {
      'tfprompt': 'Do you have to be CERTAIN of the answer before you ask a question?',
      'answer': false
    },
    {
      'tfprompt': 'Would a severe burn cause AGONY?',
      'answer': true
    },
    {
      'tfprompt': 'Does a soldier standing at attention SLUMP?',
      'answer': false
    },
    {
      'tfprompt': 'Is it COURTEOUS to slam a door in someone\'s face?',
      'answer': false
    },
    {
      'tfprompt': 'Can you VARY the clothes you wear?',
      'answer': true
    },
    {
      'tfprompt': 'Is \'No, you absolutely can\'t go\' a DEFINITE answer?',
      'answer': true
    },
    {
      'tfprompt': 'Is ice SCARCE at the North Pole?',
      'answer': false
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
