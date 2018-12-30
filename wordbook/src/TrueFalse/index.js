import React, { Component } from 'react';

export default class TrueFalse extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  render () {
    return (
      <fieldset onChange={this.changeHandler}>
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
