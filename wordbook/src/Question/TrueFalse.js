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
      <fieldset onChange={this.changeHandler} className='form-group position-relative'>
        <legend>{this.props.prompt}</legend>
        <div className='form-check form-check-inline'>
          <input type='radio' value='true' id='true' name={this.props.prompt} required checked={this.props.value === 'true'} />
          <label for='true' className='btn btn-outline-primary'>
            True
          </label>
        </div>
        <div className='form-check form-check-inline'>
          <input type='radio' value='false' id='false' name={this.props.prompt} required checked={this.props.value === 'false'} />
          <label for='false' className='btn btn-outline-primary'>
            False
          </label>
        </div>
        {this.props.children}
      </fieldset>
    );
  }
}
