import React, { Component } from 'react';
import Question from './Question.js';

class QuizContainer extends Component {
  constructor (props) {
    super(props);
    this.startQuiz = this.startQuiz.bind(this);
    this.state = {
      currentQuestion: 0,
      takingQuiz: false,
      totalQuestions: 0
    }
  }

  nextQuestion () {
    // Question passes up whether it has been correctly answered
  }

  startQuiz (numQuestions) {
    this.setState({ takingQuiz: true, totalQuestions: numQuestions })
  }

  render () {
    const { instructions, questions, title, type } = this.props;
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <h2>Instructions</h2>
        <p>{instructions}</p>
        {!this.state.takingQuiz &&
          <React.Fragment>
            <p>Are you ready to start?</p>
            <button onClick={() => this.startQuiz(questions.length)}>Yes!</button>
          </React.Fragment>
        }
        {this.state.takingQuiz &&
          <Question
            prompt={questions[this.state.currentQuestion].prompt}
            answers={questions[this.state.currentQuestion].answers}
          />
        }
      </React.Fragment>
    )
  }
}

export default QuizContainer;
