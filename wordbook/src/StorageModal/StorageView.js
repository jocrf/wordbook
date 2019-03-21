import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: design storage view

export default class StorageView extends Component {
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
                <input type='checkbox' id='enable-storage' onChange={this.props.enableStorage} />
              </div>
            </section>
        }
        {
          this.props.useStorage &&
            <section className='card d-flex'>
              <div className='card-body p-0'>
                <button onClick={this.props.saveProgress} class='btn btn-secondary m-2'>Save progress</button>
                <Link to={prevSessionUrl} class='btn btn-secondary m-2'>Restore saved session</Link>
              </div>
            </section>
        }
      </React.Fragment>
    );
  }
}
