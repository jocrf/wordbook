import React from 'react';
import ReactDOM from 'react-dom';
import App from './index.js';
import * as API from '../API';

jest.mock('../API');

const mockQuizData = {
  'instructions': 'These are instructions.',
  'type': 'placement',
  'groups': [
    {
      'title': 'Group One',
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
        }]
    }]
};

beforeEach(() => {
  API.get.mockResolvedValue(mockQuizData);
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('after data is retrieved, a function is called with the data', () => {
  expect(API.get).toHaveBeenCalledTimes(1);
});

test('quiz data populates', () => {
  API.get.mockResolvedValue(mockQuizData);
  let node = document.createElement('div');
  let instance = ReactDOM.render(<App />, node);
  jest.spyOn(instance, 'setState');
  instance.populateQuizData(mockQuizData);
  expect(instance.setState).toHaveBeenCalledTimes(1);
});
