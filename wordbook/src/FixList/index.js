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
    const linkText = this.props.fixType === 'prefixes' ? 'suffixes' : 'prefixes';
    return (
      <React.Fragment>
        <div className='card bg-transparent border-0'>
          <div className='card-body'>
            <div className='mb-3 mb-sm-0 d-sm-flex align-items-baseline'>
              <h2 className='card-title'>{this.state.content.title}</h2>
              <span className='d-none d-sm-block pl-sm-3 pr-sm-3'>|</span>
              <NavLink to={`/learning/${linkText}`}>Common {linkText[0].toUpperCase() + linkText.slice(1)}</NavLink>
            </div>
            <p className='card-text'>{this.state.content.text}</p>
            <ul className='list-group list-group-flush'>
              {this.state.content.list.map(fix => (
                <li key={fix.id} className='list-group-item'>
                  <h3>{fix.title}</h3>
                  <p>{fix.meaning}</p>
                  <ul className='list-group list-group-flush'>
                    {fix.examples.map(example => (
                      <li key={example.word} className='list-group-item'>
                        {example.word}: {example.def}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
