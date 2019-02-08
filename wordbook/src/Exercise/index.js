import React, { Component } from 'react';
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
    let question;
    switch (this.props.questionType) {
      case 'mc-all':
      case 'tf':
        question = this.props.questions.map(question => this.renderQuestion(question, this.props.questionType));
        break;
      case 'mc-one':
      case 'fitb':
        const currentQuestion = this.props.questions[this.state.currentQuestionIndex];
        question = this.renderQuestion(currentQuestion, this.props.questionType);
        break;
      default:
        question = <div>Default question</div>;
    }
    return (
      <QuestionWrapper onButtonClick={this.checkButtonHandler} buttonText={this.state.buttonText}>
        {question}
      </QuestionWrapper>
    );
  }
  renderQuestion (question, type) {
    const correctProps = {
      correct: this.state.showAnswers ? (this.state.selectedAnswers[question.prompt] === question.correct) : null,
      correctReview: this.state.showAnswers ? (this.state.selectedAnswers[question.part1] === question.correct) : null
    };
    const showWord = this.state.showAnswers && !this.props.placement && type === 'mc-one';
    return (
      <React.Fragment key={question.prompt + question.answer}>
        <Question
          {...correctProps}
          type={type}
          part1={question.part1}
          part2={question.part2}
          wordlist={this.props.wordlist}
          prompt={question.prompt}
          answers={question.answers}
          correctAnswer={type === 'mc-all' ? question.answers[question.correct] : question.correct}
          onChange={this.changeHandler}
          placement={this.props.placement}
          markWrongAnswers={this.props.markWrongAnswers} // for placement
          value={this.state.selectedAnswers[question.prompt] || this.state.selectedAnswers[question.part1]}
        // TODO word
        >
          {this.state.showAnswers && <Score
            {...correctProps}
          />}
        </Question>
        {showWord &&
          <Word
            definition={this.props.definitions[question.word]}
          />
        }
      </React.Fragment>
    );
  }
  componentDidCatch (error, info) {
    // set state to 'errored' or similar and have logic in the render method to render an alternative experience if errors
    console.log(error, info);
  }
}
