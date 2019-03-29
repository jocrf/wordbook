import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LearningPage from '../LearningPage';
import Home from '../Home';
import PlacementPage from '../PlacementPage';
import Breadcrumb from '../Breadcrumb';
import { urlPrefix } from '../API';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.setStorageState = this.setStorageState.bind(this);
    this.state = {
      declinedStorage: false,
      useStorage: false
    };
  }

  setStorageState (bool) {
    if (bool) {
      this.setState({ useStorage: true });
    } else {
      this.setState({ declinedStorage: true });
    }
  }

  render () {
    return (
      <main className='container bg-secondary min-vh-100'>
        <header className='row justify-content-between bg-gradient-secondary'>
          <div className='mb-1 col-sm ml-3 mr-3 mh-100 '>
            <a href='http://jocrf.org' target='_blank' rel='noopener noreferrer'>
              <img src={`${urlPrefix}/logo_0.png`} alt="Johnson O'Connor Logo" className='mw-100 mh-100' />
            </a>
          </div>
          <h1 className='text-right align-self-end mr-3 col-sm text-primary'>
            Wordbook
            {/* below for potential multi-colored title */}
            {/* <span className='level level-1'>W</span>
            <span className='level level-2'>o</span>
            <span className='level level-3'>r</span>
            <span className='level level-4'>d</span>
            <span className='level level-5'>b</span>
            <span className='level level-6'>o</span>
            <span className='level level-7'>o</span>
            <span className='level level-8'>k</span> */}
          </h1>
        </header>
        <Route path='/:learning?/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?' component={Breadcrumb} />
        <Route exact path='/' component={Home} />
        <Route path='/placement' component={PlacementPage} />
        <Route path='/learning' render={() => <LearningPage
          declinedStorage={this.state.declinedStorage}
          setStorageState={this.setStorageState}
          useStorage={this.state.useStorage}
        />} />
        <footer className='justify-content-end'>
          <div className='d-flex justify-content-end align-items-end mt-3'>
            <p className='mb-0 text-muted footer-text'>Phonetics and audio provided by Merriam-Webster Inc.</p>
            <div className='mw-logo'>
              <img src={`${urlPrefix}/MWLogo_LightBG.png`} alt='Merriam-Webster logo' />
            </div>
          </div>
          <p className='mb-0 pr-3 text-muted footer-text text-right'>WORDBOOK Copyright © 1988, 1983 by <a href='http://jocrf.org' target='_blank' rel='noopener noreferrer'>Johnson O'Connor Research Foundation, Inc.</a></p>
          <p className='mb-0 pr-3 text-muted footer-text text-right'>Wordbook App Copyright © 2019</p>
          <p className='mb-0 pr-3 text-muted footer-text text-right'>Designed and built by <a href='https://amyfrieson.com' target='_blank' rel='noopener noreferrer'>Amy Frieson</a></p>
        </footer>
      </main>
    );
  }
}
