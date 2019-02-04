import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render () {
    return (
      <div className='jumbotron bg-primary col-md-8 mx-auto'>
        <h1 className='display-4 text-light'>
          Welcome to the Wordbook App.
        </h1>
        <hr className='my-4 bg-light' />
        <div className='container mb-3'>
          <p className='lead text-light'>
            If this is your first visit, take the placement quiz.
          </p>
          <Link to='/placement/0' className='btn btn-orange'>Placement Quiz</Link>
        </div>
        <div className='container'>
          <p className='lead text-light'>
            Otherwise, continue learning.
          </p>
          <Link to='/learning' className='btn btn-orange'>Select Your Level</Link>
        </div>
      </div>
    );
  }
}
