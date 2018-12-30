import React, { Component } from 'react';
import Exercise from '../Exercise';

var data = {
  'type': 'mc',
  'questions': [
    {
      'prompt': 'Starting to DECAY.',
      'answers': [
        'appear',
        'ripen',
        'rot',
        'change',
        'shrink'
      ],
      'word': 'DECAY',
      'correct': 'rot'
    },
    {
      'prompt': 'Why is she so MISERABLE?',
      'answers': [
        'unhappy',
        'greedy',
        'glad',
        'thin',
        'lonely'
      ],
      'word': 'MISERABLE',
      'correct': 'unhappy'
    },
    {
      'prompt': 'Caused him to TREMBLE.',
      'answers': [
        'jump',
        'stiffen',
        'fall',
        'shake',
        'sweat'
      ],
      'word': 'TREMBLE',
      'correct': 'shake'
    },
    {
      'prompt': 'Lost the TROPHY.',
      'answers': [
        'race',
        'chance',
        'jewel',
        'battle',
        'prize'
      ],
      'word': 'TROPHY',
      'correct': 'prize'
    },
    {
      'prompt': 'Whom did they ELECT?',
      'answers': [
        'name',
        'vote against',
        'speak to',
        'hope for',
        'choose'
      ],
      'word': 'ELECT',
      'correct': 'choose'
    },
    {
      'prompt': 'You TERRIFY her.',
      'answers': [
        'please',
        'scare',
        'praise',
        'hurt',
        'dislike'
      ],
      'word': 'TERRIFY',
      'correct': 'scare'
    },
    {
      'prompt': 'Large TERRITORY.',
      'answers': [
        'building',
        'area',
        'ocean',
        'monster',
        'government'
      ],
      'word': 'TERRITORY',
      'correct': 'area'
    },
    {
      'prompt': 'When will it THAW?',
      'answers': [
        'break',
        'rain',
        'flow',
        'melt',
        'freeze'
      ],
      'word': 'THAW',
      'correct': 'melt'
    },
    {
      'prompt': 'When will you DEPART?',
      'answers': [
        'begin',
        'finish',
        'leave',
        'come',
        'shop'
      ],
      'word': 'DEPART',
      'correct': 'leave'
    },
    {
      'prompt': 'Let them HOLLER.',
      'answers': [
        'yell',
        'sleep',
        'come',
        'laugh',
        'talk'
      ],
      'word': 'HOLLER',
      'correct': 'yell'
    },
    {
      'prompt': 'Will he PARTICIPATE?',
      'answers': [
        'lose',
        'be friendly',
        'leave',
        'take part',
        'be eager'
      ],
      'word': 'PARTICIPATE',
      'correct': 'take part'
    },
    {
      'prompt': 'RAPID workers.',
      'answers': [
        'angry',
        'good',
        'fast',
        'slow',
        'smart'
      ],
      'word': 'RAPID',
      'correct': 'fast'
    },
    {
      'prompt': 'REFUND the money.',
      'answers': [
        'spend',
        'turn down',
        'give away',
        'earn',
        'pay back'
      ],
      'word': 'REFUND',
      'correct': 'pay back'
    },
    {
      'prompt': 'Satisfactory RESPONSE.',
      'answers': [
        'pay',
        'ending',
        'beginning',
        'answer',
        'report'
      ],
      'word': 'RESPONSE',
      'correct': 'answer'
    },
    {
      'prompt': 'He SCORCHED it.',
      'answers': [
        'burned',
        'soaked',
        'tried',
        'cut',
        'dried'
      ],
      'word': 'SCORCH',
      'correct': 'burned'
    }
  ]
};

export default class ExercisePage extends Component {
  render () {
    return (
      // maybe has nav
      <React.Fragment>
        <h1>Title of exercise</h1>
        <p>Instructions</p>
        <p>Example question, sometimes</p>
        <Exercise
          questions={data.questions}
          questionType={data.type}
          // questionsToShow
        />
      </React.Fragment>
    );
  }
}
