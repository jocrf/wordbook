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
      <fieldset onChange={this.changeHandler} className='form-group'>
        <legend>{this.props.prompt}</legend>
        <div className='form-check form-check-inline'>
          <input type='radio' value='true' id='true' name={this.props.prompt} className='form-check-input' required />
          <label for='true' className='form-check-label'>
            True
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input type='radio' value='false' id='false' name={this.props.prompt}  className='form-check-input' required />
          <label for='false' className='form-check-label'>
            False
          </label>
        </div>
      </fieldset>
    );
  }
}
