import React, { Component } from 'react';
import './App.css';
import QuizContainer from './QuizContainer.js';
import { get } from './API.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.populateQuizData = this.populateQuizData.bind(this);
    this.state = {
      instructions: '',
      quizItems: [],
      quizType: ''
    }
  }

  componentDidMount () {
    get()
      .then(results => this.populateQuizData(results.placementquiz));
  }

  populateQuizData (quizData) {
    this.setState({ instructions: quizData.instructions, quizItems: quizData.groups[0].questions, quizType: quizData.type });
  }

  render() {
    return (
      <QuizContainer instructions={this.state.instructions} questions={this.state.quizItems} />
    );
  }
}

export default App;
