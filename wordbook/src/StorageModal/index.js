import React, { Component } from 'react';
import { storageAvailable } from '../API';
import StorageView from './StorageView';

export default class StorageModal extends Component {
  constructor (props) {
    super(props);
    this.enableStorage = this.enableStorage.bind(this);
    this.saveProgress = this.saveProgress.bind(this);
    this.localStorage = window.localStorage;
  }

  componentDidMount () {
    if (storageAvailable('localStorage')) {
      // have they have already agreed to use storage?
      if (this.localStorage.getItem('usingStorage')) {
        // if so, let the App know we are using storage
        this.props.setStorageState();
        // and pop up a continue modal with last level
      } else {
        // if not, pop up a modal to ask if they want to use storage
        // but need to make sure it doesn't exist, not that they have chosen to not use it
      }
      console.log('we have storage!');
    }
  }

  enableStorage () {
    this.localStorage.setItem('usingStorage', true);
    this.props.setStorageState();
  }

  saveProgress () {
    const { exercise, section, wordset, level } = this.props;
    const savedLevel = this.localStorage.getItem('level');
    const savedSection = this.localStorage.getItem('section');
    const savedWordset = this.localStorage.getItem('wordset');
    const savedExercise = this.localStorage.getItem('exercise');
    console.log('in storage: ', savedLevel, savedExercise, savedSection, savedWordset);
    if (exercise !== savedExercise) {
      this.localStorage.setItem('exercise', exercise);
    }
    if (wordset !== savedWordset) {
      this.localStorage.setItem('wordset', wordset);
    }
    if (section !== savedSection) {
      this.localStorage.setItem('section', section);
    }
    if (level !== savedLevel) {
      this.localStorage.setItem('level', level);
    }
  }

  // check if wordset === 'review'

  render () {
    console.log(this.props.level, this.props.section, this.props.wordset, this.props.exercise);
    return (
      <React.Fragment>
        {
          !this.props.useStorage &&
          <div>
            <label htmlFor='enable-storage'>Enable storage?</label>
            <input type='checkbox' id='enable-storage' onChange={this.enableStorage} />
          </div>
        }
        {
          this.props.useStorage &&
          <StorageView saveProgress={this.saveProgress} />
        }
      </React.Fragment>
    );
  }
}
