import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import TrueFalse from '../TrueFalse';
import QuestionWrapper from '../QuestionWrapper/';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.incrementExercise = this.incrementExercise.bind(this);
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

  incrementExercise () {
    console.log('incrementing exercise');
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
      case 'tf':
        return this.renderAllTf();
      default:
        return <div>Default question</div>;
    }
  }
  renderAll () {
    return (
      <QuestionWrapper onButtonClick={this.incrementExercise} buttonText='Check Answers'>
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
  renderAllTf () {
    return (
      <QuestionWrapper onButtonClick={this.incrementExercise} buttonText='Check Answers'>
        {this.props.questions.map(question =>
          <TrueFalse
            key={question.prompt}
            prompt={question.prompt}
            correctAnswer={question.correct}
          />
        )}
      </QuestionWrapper>
    );
  }
  renderOne () {
    const question = this.props.questions[this.state.currentQuestion];
    return (
      <QuestionWrapper onButtonClick={this.incrementQuestion} buttonText='Next'>
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
