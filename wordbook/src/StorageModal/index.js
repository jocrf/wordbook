import React, { Component } from 'react';
import { storageAvailable } from '../API';
import StorageView from './StorageView';
import Message from './Message';
import { withRouter } from 'react-router-dom';

export default withRouter(class StorageModal extends Component {
  constructor (props) {
    super(props);
    this.checkForProgress = this.checkForProgress.bind(this);
    this.declineStorage = this.declineStorage.bind(this);
    this.enableStorage = this.enableStorage.bind(this);
    this.saveProgress = this.saveProgress.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.displayUpdate = this.displayUpdate.bind(this);
    this.localStorage = window.localStorage;
    this.state = {
      progressSaved: false,
      progressUpdated: false,
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

  componentDidUpdate (prevProps, prevState) {
    // if we haven't saved progress
    if (!prevState.progressSaved) {
      // check if there is data in storage
      if (this.localStorage.getItem('exercise')) {
      // if so, set state that we have saved progress
        this.setState({ progressSaved: true });
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
    this.localStorage.setItem('storageDeclined', true);
    this.props.setStorageState(false);
  }

  enableStorage () {
    this.localStorage.setItem('usingStorage', true);
    this.props.setStorageState(true);
    this.props.hideStorage();
  }

  saveProgress () {
    const { exercise, section, wordset, level } = this.props.match.params;
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
          default:
            this.localStorage.setItem('level', level);
            break;
        }
      });
      this.displayUpdate();
    }
  }

  // below methods to handle an undefined type (i.e. if an exercise hasn't been selected)
  setMessage () {
    this.setState({ undefinedType: true }, () => {
      setTimeout(() => this.setState({ undefinedType: false }), 2000);
    });
  }

  displayUpdate () {
    this.setState({ progressUpdated: true }, () => {
      setTimeout(() => {
        this.setState({ progressUpdated: false });
        this.props.hideStorage();
      }, 2000);
    });
  }

  render () {
    return (
      <React.Fragment>
        {
          !this.props.declinedStorage &&
            <React.Fragment>
              <StorageView
                hideStorage={this.props.hideStorage}
                declineStorage={this.declineStorage}
                useStorage={this.props.useStorage}
                enableStorage={this.enableStorage}
                enableChange={this.enableChange}
                saveProgress={this.saveProgress}
                progressSaved={this.state.progressSaved}
                progressUpdated={this.state.progressUpdated}
                level={this.localStorage.getItem('level')}
                section={this.localStorage.getItem('section')}
                wordset={this.localStorage.getItem('wordset')}
                exercise={this.localStorage.getItem('exercise')}
              />
              {
                this.state.undefinedType &&
                <Message
                  messageText='Progress cannot be saved unless you are currently in an exercise.'
                />
              }
              {
                this.state.progressUpdated &&
                <Message
                  messageText='Progress saved.'
                />
              }
            </React.Fragment>
        }
      </React.Fragment>
    );
  }
});
