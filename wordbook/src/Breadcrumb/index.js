import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends Component {
  render () {
    return (
      <nav><Link to='/'>Home</Link></nav>
    )
  }
}