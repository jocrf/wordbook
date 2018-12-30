import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import TrueFalse from '../TrueFalse';
import QuestionWrapper from '../QuestionWrapper/';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.checkButtonHandler = this.checkButtonHandler.bind(this);
    this.state = {
      currentQuestionIndex: 0,
      feedback: null,
      buttonText: 'Check Answer',
      showAnswers: false,
      selectedAnswers: {}
    };
  }

  changeHandler (key, value) {
    const selectedAnswers = this.state.selectedAnswers;
    selectedAnswers[key] = value;
    this.setState({ selectedAnswers: selectedAnswers });
  }

  checkButtonHandler () {
    if (this.state.buttonText === 'Check Answer') {
      this.setState({
        buttonText: 'Next Question',
        showAnswers: true
      });
    }
    if (this.state.buttonText === 'Next Question') {
      // check if there are more questions
      // increment if there are
      // end quiz if there are not
    }
  }

  render () {
    switch (this.props.questionType) {
      case 'mc':
        return this.renderAll();
      case 'tf':
        return this.renderAllTf();
      default:
        return <div>Default question</div>;
    }
  }
  renderAll () {
    return (
      <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
        {this.props.questions.map(currentQuestion =>
          <MultipleChoice
            key={currentQuestion.correct}
            prompt={currentQuestion.prompt}
            answers={currentQuestion.answers}
            correctAnswer={currentQuestion.correct}
            onChange={this.changeHandler}
            correct={this.state.showAnswers ? this.state.selectedAnswer === currentQuestion.correctAnswer : null}
          />
        )}
      </QuestionWrapper>
    );
  }
  renderAllTf () {
    return (
      <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
        {this.props.questions.map(currentQuestion =>
          <TrueFalse
            key={currentQuestion.prompt}
            prompt={currentQuestion.prompt}
            correctAnswer={currentQuestion.correct}
            onChange={this.changeHandler}
            correct={this.state.showAnswers ? this.state.selectedAnswer === currentQuestion.correctAnswer : null}
          />
        )}
      </QuestionWrapper>
    );
  }
  renderOne () {
    const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
    return (
      <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
        <MultipleChoice
          prompt={currentQuestion.prompt}
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.correct}
          onChange={this.changeHandler}
          correct={this.state.showAnswers ? this.state.selectedAnswer === currentQuestion.correctAnswer : null}
          // showDefinition
        />
      </QuestionWrapper>
    );
  }
}
