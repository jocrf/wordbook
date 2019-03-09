import React, { Component } from 'react';
import { getContent } from '../API';

export default class FixList extends Component {
  constructor (props) {
    super(props);
    this.setContent = this.setContent.bind(this);
    this.state = {
      content: {
        title: '',
        text: '',
        list: []
      }
    };
  }

  componentDidMount () {
    const type = this.props.match.url;
    if (type.endsWith('prefixes')) {
      getContent('prefixes')
        .then(content => this.setContent(content));
    } else if (type.endsWith('suffixes')) {
      getContent('suffixes')
        .then(content => this.setContent(content));
    } else {
      throw new Error(console.log(`unexpected list type ${type}`));
    }
  }

  setContent (content) {
    this.setState({ content: content });
  }

  render () {
    console.log(this.state.content.list);
    return (
      <React.Fragment>
        <div>
          <h2>{this.state.content.title}</h2>
          <p>{this.state.content.text}</p>
          <ul>
            {this.state.content.list.map(fix => (
              <li key={fix.id}>
                <h3>{fix.title}</h3>
                <p>{fix.meaning}</p>
                <ul>
                  {fix.examples.map(example => (
                    <li>
                      {example.word}: {example.def}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
