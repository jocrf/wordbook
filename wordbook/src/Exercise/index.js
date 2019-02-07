import React, { Component } from 'react';
import MultipleChoice from '../MultipleChoice';
import TrueFalse from '../TrueFalse';
import FillInTheBlank from '../FillInTheBlank';
import QuestionWrapper from '../QuestionWrapper';
import Word from '../Word';
import Score from '../Score';
import Question from '../Question/index.js';

export default class Exercise extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.checkButtonHandler = this.checkButtonHandler.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
    this.incrementQuestionIndex = this.incrementQuestionIndex.bind(this);
    this.state = {
      currentQuestionIndex: 0,
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
      case 'tf':
        return this.renderAll(this.props.questionType);
      case 'mc-one':
      case 'fitb':
        return this.renderOne(this.props.questionType);
      default:
        return <div>Default question</div>;
    }
  }
  renderAll (type) {
    return (
      <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
        {this.props.questions.map(question =>
          <Question
            type={type}
            key={question.correct}
            prompt={question.prompt}
            answers={question.answers} // just for multiple choice
            correctAnswer={question.correct}
            onChange={this.changeHandler}
            correct={this.state.showAnswers ? this.state.selectedAnswers[question.prompt] === question.correct : null}
            value={this.state.selectedAnswers[question.prompt]}
            // TODO word
            >
            {this.state.showAnswers && <Score
              correct={this.state.showAnswers ? this.state.selectedAnswers[question.prompt] === question.correct : null}
            />} 
          </Question>
        )}
      </QuestionWrapper>
    );
  }
  // below method for placement, pretest, and review quizzes
  renderOne (type) {
    const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
    return (
      <React.Fragment>
        <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
          <Question
            type={type}
            part1={currentQuestion.part1}
            part2={currentQuestion.part2}
            wordlist={this.props.wordlist}
            prompt={currentQuestion.prompt}
            answers={currentQuestion.answers}
            correctAnswer={currentQuestion.correct}
            onChange={this.changeHandler}
            correct={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.prompt] === currentQuestion.correct : null}
            correctReview={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.part1] === currentQuestion.correct : null}
            placement={this.props.placement}
            markWrongAnswers={this.props.markWrongAnswers} // for placement
            value={this.state.selectedAnswers[currentQuestion.prompt] || this.state.selectedAnswers[currentQuestion.part1]}
            // TODO word
          >
            {this.state.showAnswers && <Score
              correct={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.prompt] === currentQuestion.correct : null}
              correctReview={this.state.showAnswers ? this.state.selectedAnswers[currentQuestion.part1] === currentQuestion.correct : null}
            />}
          </Question>
        </QuestionWrapper>
        {this.state.showAnswers && !this.props.placement && type !== 'fitb' &&
          <Word
            definition={this.props.definitions[currentQuestion.word]}
          />
        }
      </React.Fragment>
    );
  }
}
