import React, { Component } from 'react';
import { storageAvailable } from '../API';
import StorageView from './StorageView';

export default class StorageModal extends Component {
  constructor (props) {
    super(props);
    this.checkForProgress = this.checkForProgress.bind(this);
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
    }
  }

  checkForProgress (type) {
    const current = this.props[type];
    const stored = this.localStorage.getItem(type);
    return current === stored;
  }

  // build URL step - make sure to handle any undefined keys from storage

  enableStorage () {
    this.localStorage.setItem('usingStorage', true);
    this.props.setStorageState();
  }

  saveProgress () {
    const { exercise, section, wordset, level } = this.props;
    let updateArr = [];
    ['exercise', 'wordset', 'section', 'level'].forEach(type => {
      if (!this.checkForProgress(type)) {
        updateArr.push(type);
      }
    });
    updateArr.forEach(type => {
      switch (type) {
        case 'exercise':
          this.localStorage.setItem('exercise', exercise);
          break;
        case 'section':
          this.localStorage.setItem('section', section);
          break;
        case 'wordset':
          this.localStorage.setItem('wordset', wordset);
          break;
        case 'level':
          this.localStorage.setItem('level', level);
          break;
        default:
          console.log('unexpected type ' + type);
      }
    });
  }

  // check if wordset === 'review'

  render () {
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
