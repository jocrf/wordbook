import React, { Component } from 'react';

const data = {
  'exercise_1': [
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

export default class TrueFalse extends Component {
  render () {
    return (
      <fieldset>
        <legend>{this.props.prompt}</legend>
        <label>
          <input type='radio' value='true' name={this.props.prompt} required />
          True
        </label>
        <label>
          <input type='radio' value='false' name={this.props.prompt} required />
          False
        </label>
      </fieldset>
    );
  }
}
