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
      useStorage: false
    };
  }

  setStorageState () {
    this.setState({ useStorage: true });
  }

  render () {
    return (
      <main className='container bg-secondary min-vh-100'>
        <header className='row justify-content-between bg-gradient-secondary'>
          <div className='mb-1 col-sm ml-3 mr-3 mh-100 '>
            <img src={`${urlPrefix}/logo_0.png`} alt="Johnson O'Connor Logo" className='mw-100 mh-100' />
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
          setStorageState={this.setStorageState}
          useStorage={this.state.useStorage}
        />} />
      </main>
    );
  }
}
