import React, { Component } from 'react';
import { getContent } from '../API';

export default class FixList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: []
    };
  }
  render () {
    const type = this.props.match.url;
    if (type.endsWith('prefixes')) {
      getContent('prefixes');
    } else if (type.endsWith('suffixes')) {
      getContent('suffixes');
    } else {
      throw new Error(console.log(`unexpected list type ${type}`));
    }
    return (
      <React.Fragment>
        <p>hi</p>
      </React.Fragment>
    );
  }
}
