import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import TrueFalse from '../TrueFalse';
import FillInTheBlank from '../FillInTheBlank';
import QuestionWrapper from '../QuestionWrapper/';
import Wordlist from '../Wordlist';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.checkButtonHandler = this.checkButtonHandler.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
    this.incrementQuestionIndex = this.incrementQuestionIndex.bind(this);
    this.state = {
      currentQuestionIndex: 0,
      feedback: null, // am I using this?
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

  // TODO: 'Next Question' not appropriate for multi-item quizzes
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
      if (this.props.questionsToShow) {
        this.incrementQuestionIndex(this.props.questionsToShow);
      } else {
        this.endQuiz();
      }
    }
  }

  endQuiz () {
    // TODO: reset quiz state, provide stats to parent
    this.props.onQuizCompleted();
  }

  incrementQuestionIndex (numQuestions) {
    // below: length - 1 to account for zero-indexing
    if (this.state.currentQuestionIndex < this.props.questions.length - 1) {
      this.setState((state) => ({
        currentQuestionIndex: state.currentQuestionIndex + numQuestions,
        buttonText: 'Check Answer',
        showAnswers: false
      }));
    } else {
      this.endQuiz();
    }
  }

  // TODO flexible render method that displays the # of questions passed in as questionsToShow

  render () {
    switch (this.props.questionType) {
      case 'mc-all':
        return this.renderAll('mc-all');
      case 'tf':
        return this.renderAll('tf');
      case 'mc-one':
        return this.renderOne('mc-one');
      case 'fitb':
        return this.renderOne('fitb');
      default:
        return <div>Default question</div>;
    }
  }
  renderAll (type) {
    if (type === 'mc-all') {
      return (
        <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
          {this.props.questions.map(currentQuestion =>
            <MultipleChoice
              key={currentQuestion.correct}
              prompt={currentQuestion.prompt}
              answers={currentQuestion.answers}
              correctAnswer={currentQuestion.correct}
              onChange={this.changeHandler}
              correct={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.prompt] === currentQuestion.correct : null}
              // TODO word
            />
          )}
        </QuestionWrapper>
      );
    } else if (type === 'tf') {
      return (
        <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
          {this.props.questions.map(currentQuestion =>
            <TrueFalse
              key={currentQuestion.prompt}
              prompt={currentQuestion.prompt}
              correctAnswer={currentQuestion.correct}
              onChange={this.changeHandler}
              correct={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.prompt] === currentQuestion.correct : null}
              // TODO word
            />
          )}
        </QuestionWrapper>
      );
    }
  }
  // below method for placement, pretest, and review quizzes
  renderOne (type) {
    const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
    if (type === 'mc-one') {
      return (
        <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
          <MultipleChoice
            prompt={currentQuestion.prompt}
            answers={currentQuestion.answers}
            correctAnswer={currentQuestion.correct}
            onChange={this.changeHandler}
            correct={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.prompt] === currentQuestion.correct : null}
            placement={this.props.placement}
            markWrongAnswers={this.props.markWrongAnswers} // for placement
            // TODO showDefinition boolean for pretest, after question is answered
            // TODO word
          />
        </QuestionWrapper>
      );
    } else if (type === 'fitb') {
      return (
        <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
          <Wordlist
            onChange={this.changeHandler}
            wordlist={this.props.wordlist}
          />
          <FillInTheBlank
            part1={currentQuestion.part1}
            part2={currentQuestion.part2}
            // TODO: check data for consistency throughout - is it the 'answer' or the 'correct'?
            correctAnswer={currentQuestion.answer}
            correct={this.state.showAnswers ? this.state.selectedAnswers.answer === currentQuestion.answer : null}
            // TODO word
          />
        </QuestionWrapper>
      );
    }
  }
}
