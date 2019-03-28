import React, { Component } from 'react';
import Exercise from '../Exercise';
import NavPanel from '../NavPanel';
import Instructions from '../Instructions';
import { getExercise, getInstructions, getPlacement } from '../API';
import Loading from '../Loading';
import { withRouter } from 'react-router-dom';

export default withRouter(class ExercisePage extends Component {
  constructor (props) {
    super(props);
    this.incrementExercise = this.incrementExercise.bind(this);
    this.markWrongAnswers = this.markWrongAnswers.bind(this);
    this.onQuizCompleted = this.onQuizCompleted.bind(this);
    this.populateData = this.populateData.bind(this);
    this.resetWrongAnswers = this.resetWrongAnswers.bind(this);
    this.toggleQuizState = this.toggleQuizState.bind(this);
    this.state = {
      chapter: {},
      instructions: {},
      isQuizzing: false,
      quizCompleted: false,
      wordsetCompleted: false,
      wrongAnswers: 0
    };
  }

  componentDidMount () {
    this.populateData();
    if (this.props.toggleToC) {
      this.props.toggleToC();
    }
  }

  componentWillUnmount () {
    if (this.props.toggleToC) {
      this.props.toggleToC();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.exercise !== this.props.exercise) {
      this.setState({ isQuizzing: false, quizCompleted: false });
      this.populateData();
      this.resetWrongAnswers();
    }
  }

  incrementExercise () {
    console.log('incrementing');
    let nextExercise = null;
    // group for placement, exercise for LearningPage
    const { exercise, group, wrongAnswers } = this.props;
    if (this.props.placement) {
      if (group < 8 && wrongAnswers < 2) { // hard-coded based on placement data
        nextExercise = +group + 1;
      } else {
        nextExercise = null;
      }
    } else {
      switch (exercise) {
        case '1':
        case '2':
          nextExercise = +exercise + 1;
          break;
        case '0':
          nextExercise = 1;
          break;
        case '3':
          nextExercise = null;
          break;
        default:
          throw new Error(console.log(`unexpected exercise type: ${exercise}`));
      }
    }
    if (nextExercise) {
      const currentUrl = this.props.match.url;
      const regex = /(\w+)$|\d$/;
      if (group >= 0) {
        this.props.history.push(currentUrl.replace(regex, nextExercise + 1));
      } else {
        this.props.history.push(currentUrl.replace(regex, nextExercise));
      }
    } else {
      this.setState({ wordsetCompleted: true });
    }
  }

  markWrongAnswers () {
    this.setState((prevState) => ({ wrongAnswers: prevState.wrongAnswers + 1 }));
  }

  onQuizCompleted () {
    this.setState({ quizCompleted: true, isQuizzing: false });
  }

  populateData () {
    const { level, section, wordset, exercise, review, placement } = this.props;
    getInstructions(exercise, review, placement)
      .then(instructions => this.setState({ instructions: instructions }));
    if (placement) {
      return getPlacement(exercise)
        .then(data => this.setState({ chapter: data }));
    }
    getExercise(level, section, wordset, exercise, review)
      .then(data => this.setState({ chapter: data }));
  }

  resetWrongAnswers () {
    this.setState({ wrongAnswers: 0 });
  }

  toggleQuizState () {
    this.setState((state) => ({ isQuizzing: !state.isQuizzing }));
  }

  render () {
    return (
      <section className='card'>
        <div className='card-body'>
          {/* make sure we have data to load */}
          {
            !this.state.chapter.exercise &&
            <Loading
              color='orange-dark'
              msg='Loading exercise...'
              failureMsg="Sorry, we're having trouble connecting to the database. Please try refreshing your browser or come back later."
            />
          }
          {
            this.state.chapter.exercise &&
            <React.Fragment>
              {!this.state.isQuizzing &&
                <NavPanel
                  level={this.props.level}
                  wordset={this.props.wordset}
                  section={this.props.section}
                  exercise={this.props.exercise}
                  group={this.props.group}
                  type={this.state.chapter.exercise.type}
                  wrongAnswers={this.state.wrongAnswers}
                  numQuestions={this.state.chapter.exercise.questions.length}
                  review={this.props.review}
                  placement={this.props.placement}
                  quizCompleted={this.state.quizCompleted}
                  toggleQuizState={this.toggleQuizState}
                  instructions={this.state.instructions}
                  incrementExercise={this.incrementExercise}
                  wordsetCompleted={this.state.wordsetCompleted}
                />
              }
              {this.state.isQuizzing &&
                <React.Fragment>
                  <Instructions
                    title={this.state.instructions.title}
                    instructions={this.state.instructions.instructions}
                    exampleQuestion={this.state.instructions.example}
                    exampleAnswer={this.state.instructions['example-answer']}
                    level={this.props.level}
                    wordset={this.props.wordset}
                    section={this.props.section}
                  />
                  <div className='row'>
                    <Exercise
                      definitions={this.state.chapter.definitions}
                      questions={this.state.chapter.exercise.questions}
                      questionType={this.state.chapter.exercise.type}
                      id={this.state.chapter.exercise.id}
                      questionsToShow={this.state.chapter.exercise.type === 'mc-one' || this.state.chapter.exercise.type === 'fitb' ? 1 : null}
                      wordlist={this.state.chapter.exercise.wordList}
                      onQuizCompleted={this.onQuizCompleted}
                      toggleQuizState={this.toggleQuizState}
                      markWrongAnswers={this.markWrongAnswers}
                      wrongAnswers={this.state.wrongAnswers}
                      placement={this.props.placement}
                      incrementExercise={this.incrementExercise}
                      wordsetCompleted={this.state.wordsetCompleted}
                    />
                  </div>
                </React.Fragment>
              }
            </React.Fragment>
          }
        </div>
      </section>
    );
  }
});
