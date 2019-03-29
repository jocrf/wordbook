import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: design storage view

export default class StorageView extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (action) {
    switch (action) {
      case 'yes':
        this.props.enableStorage();
        break;
      case 'no':
        this.props.declineStorage();
        break;
      case 'save':
        this.props.saveProgress();
        break;
      default:
        this.props.hideStorage();
    }
  }

  render () {
    const { level, section, wordset, exercise } = this.props;
    let prevSessionUrl;
    // build URL step - make sure to handle any undefined keys from storage
    wordset === 'review'
      ? prevSessionUrl = `/learning/level/${level}/section/${section}/review/${exercise}`
      : prevSessionUrl = `/learning/level/${level}/section/${section}/wordset/${wordset}/exercise/${exercise}`;
    return (
      <React.Fragment>
        {
          !this.props.useStorage &&
            <section className='card'>
              <div className='card-body p-2'>
                <label htmlFor='enable-storage'>Would you like the option to save your progress?</label>
                <div className='btn-group' role='group' aria-label='Save progress'>
                  <button type='button' className='btn btn-orange' onClick={() => this.handleClick('yes')}>Yes</button>
                  <button type='button' className='btn btn-orange' onClick={() => this.handleClick('no')}>No</button>
                </div>
              </div>
            </section>
        }
        {
          this.props.useStorage &&
            <section className='card d-flex'>
              <div className='card-body p-0'>
                {
                  this.props.progressSaved &&
                  <button onClick={() => this.handleClick('save')} className='btn btn-secondary m-2'>Save progress</button>
                }
                {
                  this.props.progressSaved &&
                  <Link to={prevSessionUrl} className='btn btn-secondary m-2' onClick={this.handleClick}>Restore saved session</Link>
                }
              </div>
            </section>
        }
      </React.Fragment>
    );
  }
}
