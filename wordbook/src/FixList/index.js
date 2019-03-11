import React, { Component } from 'react';
import { getContent } from '../API';
import { NavLink } from 'react-router-dom';

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
    this.props.toggleToC();
    const type = this.props.fixType;
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

  componentDidUpdate (prevProps) {
    if (prevProps.fixType !== this.props.fixType) {
      getContent(this.props.fixType)
        .then(content => this.setContent(content));
    }
  }

  componentWillUnmount () {
    this.props.toggleToC();
  }

  setContent (content) {
    this.setState({ content: content });
  }

  render () {
    // const linkOptions = {
    //   prefixes: 'Prefixes',
    //   suffixes: 'Suffixes'
    // };
    const linkText = this.props.fixType === 'prefixes' ? 'suffixes' : 'prefixes';
    console.log(this.props);
    return (
      <React.Fragment>
        <div>
          <div>
            <h2>{this.state.content.title}</h2>
            <NavLink to={`/learning/${linkText}`}>Common {linkText[0].toUpperCase() + linkText.slice(1)}</NavLink>
          </div>
          <p>{this.state.content.text}</p>
          <ul>
            {this.state.content.list.map(fix => (
              <li key={fix.id}>
                <h3>{fix.title}</h3>
                <p>{fix.meaning}</p>
                <ul>
                  {fix.examples.map(example => (
                    <li key={example.word}>
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
