import React, { Component } from 'react';
import { storageAvailable } from '../API';

export default class StorageModal extends Component {
  constructor (props) {
    super(props);
    this.enableStorage = this.enableStorage.bind(this);
    this.localStorage = window.localStorage;
  }

  componentDidMount () {
    if (storageAvailable('localStorage')) {
      // check if they have already agreed to use storage
      if (this.localStorage.getItem('usingStorage')) {
        // if so, let the App know we are using storage
        this.props.setStorageState();
        // and pop up a continue modal with last level
      } else {
        // if not, pop up a modal to ask if they want to use storage
      }
      console.log('we have storage!');
    }
  }

  enableStorage () {
    this.localStorage.setItem('usingStorage', true);
    this.props.setStorageState();
  }

  render () {
    console.log(this.props.level);
    return (
      <React.Fragment>
        {!this.props.useStorage &&
          <div>
            <label htmlFor='enable-storage'>Enable storage?</label>
            <input type='checkbox' id='enable-storage' onChange={this.enableStorage} />
          </div>
        }
      </React.Fragment>
    );
  }
}
