import React, { Component } from 'react';

export default class TrueFalse extends Component {
  render () {
    return (
      <fieldset>
        <legend>{this.props.prompt}</legend>
        <label>
          <input type='radio' value='true' name={this.props.prompt} required />
          True
        </label>
        <label>
          <input type='radio' value='false' name={this.props.prompt} required />
          False
        </label>
      </fieldset>
    );
  }
}
