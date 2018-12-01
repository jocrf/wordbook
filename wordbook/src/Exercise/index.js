import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import QuestionWrapper from '../QuestionWrapper/';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.incrementQuestion = this.incrementQuestion.bind(this);
    this.state = {
      currentQuestion: 1
    };
  }

  componentDidUpdate () {
    if (this.state.currentQuestion === this.props.questions.length) {
      // TODO
      console.log('end the quiz here');
    }
  }

  incrementQuestion () {
    console.log('incrementing');
    this.setState(currentState => (
      { currentQuestion: currentState.currentQuestion + 1 }
    ));
  }

  render () {
    switch (this.props.questionType) {
      case 'mc':
        return this.renderAll();
      default:
        return <div>Default question</div>;
    }
  }
  renderAll () {
    return (
      <QuestionWrapper onNextClick={this.incrementQuestion}>
        {this.props.questions.map(question =>
          <MultipleChoice
            key={question.correct}
            prompt={question.prompt}
            answers={question.answers}
            correctAnswer={question.correct}
          />
        )}
      </QuestionWrapper>
    );
  }
  renderOne () {
    const question = this.props.questions[this.state.currentQuestion];
    return (
      <QuestionWrapper onNextClick={this.incrementQuestion}>
        <MultipleChoice
          prompt={question.prompt}
          answers={question.answers}
          correctAnswer={question.correct}
          showDefinition
        />
      </QuestionWrapper>
    );
  }
}
