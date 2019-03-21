import React, { Component } from 'react';
import { storageAvailable } from '../API';
import StorageView from './StorageView';
import UndefinedMessage from './UndefinedMessage';

export default class StorageModal extends Component {
  constructor (props) {
    super(props);
    this.checkForProgress = this.checkForProgress.bind(this);
    this.declineStorage = this.declineStorage.bind(this);
    this.enableStorage = this.enableStorage.bind(this);
    this.saveProgress = this.saveProgress.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.unsetMessage = this.unsetMessage.bind(this);
    this.localStorage = window.localStorage;
    this.state = {
      undefinedType: false
    };
  }

  componentDidMount () {
    if (storageAvailable('localStorage')) {
      // have they have already agreed to use storage?
      if (this.localStorage.getItem('usingStorage')) {
        // if so, let the App know we are using storage
        this.props.setStorageState(true);
        // and pop up a continue modal with last level
      } else {
        // if not, pop up a modal to ask if they want to use storage
        // but need to make sure it doesn't exist, not that they have chosen to not use it
      }
    }
  }

  checkForProgress (type) {
    const current = this.props[type];
    if (!current) {
      this.setMessage();
      return false;
    }
    const stored = this.localStorage.getItem(type);
    return current === stored;
  }

  declineStorage () {
    console.log('declined');
    this.localStorage.setItem('storageDeclined', true);
    this.props.setStorageState(false);
  }

  enableStorage () {
    this.localStorage.setItem('usingStorage', true);
    this.props.setStorageState(true);
  }

  saveProgress () {
    const { exercise, section, wordset, level } = this.props;
    let updateArr = [];
    ['exercise', 'wordset', 'section', 'level'].forEach(type => {
      if (!this.checkForProgress(type)) {
        updateArr.push(type);
      }
    });
    // do not update storage if any type is undefined
    if (exercise && section && wordset && level) {
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
  }

  // below methods to handle an undefined type (i.e. if an exercise hasn't been selected)
  // using set and unset rather than a toggle method because if an even number of types are undefined, the toggle will cancel out
  setMessage () {
    this.setState({ undefinedType: true });
  }

  unsetMessage () {
    this.setState({ undefinedType: false });
  }

  render () {
    return (
      <React.Fragment>
        {
          !this.props.declinedStorage &&
            <React.Fragment>
              <StorageView
                declineStorage={this.declineStorage}
                useStorage={this.props.useStorage}
                enableStorage={this.enableStorage}
                enableChange={this.enableChange}
                saveProgress={this.saveProgress}
                level={this.localStorage.getItem('level')}
                section={this.localStorage.getItem('section')}
                wordset={this.localStorage.getItem('wordset')}
                exercise={this.localStorage.getItem('exercise')}
              />
              {
                this.state.undefinedType &&
                <UndefinedMessage unsetMessage={this.unsetMessage} />
              }
            </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
