import React, { Component } from 'react';

export default class Loading extends Component {
  constructor (props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.setTimeLimit = this.setTimeLimit.bind(this);
    this.state = {
      timedOut: false
    };
  }

  componentDidMount () {
    this.startTimer();
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutId);
  }

  startTimer () {
    this.timeoutId = setTimeout(this.setTimeLimit, 10000);
  }

  setTimeLimit () {
    this.setState({ timedOut: true });
  }

  render () {
    return (
      <React.Fragment>
        {
          !this.state.timedOut &&
            <p className='card-text'>
              Loading exercise...
            </p>
        }
        {
          this.state.timedOut &&
            <p className='card-text'>
              Sorry, we're having trouble connecting to the database. Please try refreshing your browser or come back later.
            </p>
        }
      </React.Fragment>
    );
  }
}
