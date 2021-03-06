import React, { Component } from 'react';
import QuestionWrapper from '../QuestionWrapper';
import Word from '../Word';
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
      buttonText: 'Submit',
      showAnswers: false,
      selectedAnswers: {}
    };
  }

  changeHandler (key, value) {
    const selectedAnswers = this.state.selectedAnswers;
    selectedAnswers[key] = value;
    this.setState({ selectedAnswers: selectedAnswers });
  }

  // TODO: 'Next' not appropriate for multi-item quizzes
  checkButtonHandler () {
    if (this.state.buttonText === 'Submit') {
      this.setState({
        buttonText: 'Next',
        showAnswers: true
      });
    }
    if (this.state.buttonText === 'Next') {
      // check if there are more questions
      // increment if there are
      // end quiz if there are not
      if (this.props.questionsToShow) {
        this.incrementQuestionIndex(this.props.questionsToShow);
      } else {
        this.endQuiz();
        if (this.props.questionType === 'tf' || this.props.questionType === 'mc-all') {
          if (!this.props.wordsetCompleted) {
            this.props.incrementExercise();
          }
        }
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
        buttonText: 'Submit',
        showAnswers: false
      }));
    } else {
      this.endQuiz();
    }
  }

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
      <QuestionWrapper
        wrongAnswers={this.props.wrongAnswers}
        numQuestions={this.props.numQuestions}
        onButtonClick={this.checkButtonHandler}
        buttonText={this.state.buttonText}
        type={this.props.questionType}
        placement={this.props.placement}
        showAnswers={this.state.showAnswers}
        incrementExercise={this.props.incrementExercise}
        wordsetCompleted={this.props.wordsetCompleted}
      >
        {question}
      </QuestionWrapper>
    );
  }
  renderQuestion (question, type) {
    let showWord = this.state.showAnswers && !this.props.placement && type === 'mc-one';
    let reviewPrompt = question.part1 + ' ' + question.part2;
    return (
      <React.Fragment key={question.prompt + question.answer}>
        <Question
          type={type}
          id={this.props.id}
          part1={question.part1}
          part2={question.part2}
          wordlist={this.props.wordlist}
          prompt={question.prompt}
          reviewPrompt={reviewPrompt}
          options={question.answers}
          correctAnswer={type === 'mc-all' ? question.answers[question.correct] : question.correct}
          altAnswer={question.alternate}
          onChange={this.changeHandler}
          placement={this.props.placement}
          markWrongAnswers={this.props.markWrongAnswers}
          value={this.state.selectedAnswers[question.prompt] || this.state.selectedAnswers[reviewPrompt]}
          showAnswers={this.state.showAnswers}
          word={question.word}
          definition={this.props.definitions ? this.props.definitions[question.word] : null}
        />
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
