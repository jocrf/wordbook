import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import SingleQuestionWrapper from '../SingleQuestionWrapper/';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentQuestion: 1
    };
  }
  render () {
    switch (this.props.questionType) {
      case 'mc':
        return this.renderOne();
      default:
        return <div>Default question</div>;
    }
  }
  renderAll () {
    return this.props.questions.map(question =>
      <MultipleChoice
        key={question.correct}
        prompt={question.prompt}
        answers={question.answers}
        correctAnswer={question.correct}
        showDefinition
      />
    );
  }
  renderOne () {
    const question = this.props.questions[this.state.currentQuestion];
    return (
      <SingleQuestionWrapper onNextClick={this.incrementQuestion}>
        <MultipleChoice prompt={question.prompt} answers={question.answers} correctAnswer={question.correct} showDefinition />
      </SingleQuestionWrapper>
    );
  }
}
