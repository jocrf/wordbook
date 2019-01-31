import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render () {
    return (
      <div className='jumbotron'>
        <h1 className='display-4'>
          Welcome to the Wordbook App.
        </h1>
        <hr className='my-4' />
        <p className='lead'>
          If this is your first visit, take the placement quiz.
        </p>
        <Link to='/placement' className='btn btn-primary'>Placement Quiz</Link>
        <p className='lead'>
          Otherwise, continue learning.
        </p>
        <Link to='/learning' className='btn btn-primary'>Select Your Level</Link>
      </div>
    );
  }
}
