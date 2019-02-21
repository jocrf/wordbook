import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LearningPage from '../LearningPage';
import Home from '../Home';
import PlacementPage from '../PlacementPage';
import Breadcrumb from '../Breadcrumb';

export default class App extends Component {
  render () {
    return (
      <main className='container bg-secondary min-vh-100'>
        <header className='row justify-content-between bg-gradient-secondary'>
          <div className='mb-1 col-sm ml-3 mr-3 mh-100 '>
            <img src='http://localhost:3000/logo_0.png' alt="Johnson O'Connor Logo" className='mw-100 mh-100' />
          </div>
          <h1 className='text-right align-self-end mr-3 col-sm text-primary'>Wordbook</h1>
        </header>
        <Route path='/:learning?/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?' component={Breadcrumb} />
        <Route exact path='/' component={Home} />
        <Route path='/placement' component={PlacementPage} />
        <Route path='/learning' component={LearningPage} />
      </main>
    );
  }
}
