import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Instructions from '../Instructions';

export default withRouter(class NavPanel extends Component {
  constructor (props) {
    super(props);
    this.incrementExercise = this.incrementExercise.bind(this);
    this.state = {
      wordsetCompleted: false
    };
  }

  incrementExercise () {
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

  render () {
    // TODO: add type checker - if type 'review', say 'x', if type 'placement', say 'y', etc
    const { level, section, wordset, exercise, group, instructions, wrongAnswers, numQuestions } = this.props;
    return (
      <React.Fragment>
        {/* for placement quiz */}
        {this.props.placement &&
          <React.Fragment>
            {/* initial instructions page for placement quiz / intro */}
            {
              +group === 0 && !this.props.quizCompleted &&
              <React.Fragment>
                <Instructions
                  title={instructions.title}
                  instructions={instructions.overview}
                />
                <p className='card-text'>Ready to start?</p>
                <button className='btn btn-primary' onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {/* before starting next placement level */}
            {
              !this.props.quizCompleted && +group > 0 && +group < 8 &&
              <React.Fragment>
                <p className='card-text'>Ready to start the next level?</p>
                <button className='btn btn-primary' onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {/* after completing a placement level */}
            {
              !this.state.wordsetCompleted && this.props.quizCompleted &&
              <React.Fragment>
                <p className='card-text'>You've made it through Level {+group + 1} of the placement quiz!</p>
                <p className='card-text'>You got {numQuestions - wrongAnswers} out of {numQuestions} correct.</p>
                <button className='btn btn-primary' onClick={this.incrementExercise}>Continue</button>
              </React.Fragment>
            }
            {/* end of placement quiz / outro - 8 is an exception because it's the max, and we don't want the group to be displayed as level 9 */}
            {
              (this.state.wordsetCompleted || +group === 8) &&
              <React.Fragment>
                <p className='card-text'>Level {+group === 8 ? +group : +group + 1} is the correct difficulty level for you! Are you ready to start building your vocabulary?</p>
                <NavLink className='btn btn-primary' to={`/learning/level/${+group === 8 ? +group : +group + 1}/section/1/wordset/1/exercise/0`}>Begin learning</NavLink>
              </React.Fragment>
            }
          </React.Fragment>
        }
        {/* every level other than placement */}
        {!this.props.placement &&
          <React.Fragment>
            {/* starting a new exercise / instructions */}
            {
              !this.props.quizCompleted &&
              <React.Fragment>
                <Instructions
                  title={instructions.title}
                  instructions={instructions.instructions}
                  exampleQuestion={instructions.example}
                  exampleAnswer={instructions['example-answer']}
                  level={this.props.level}
                  wordset={this.props.wordset}
                  section={this.props.section}
                />
                <p className='card-text'>Ready to learn?</p>
                <button className='btn btn-primary'onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {/* exercise completion */}
            {
              this.props.quizCompleted && !this.state.wordsetCompleted && !this.props.review && this.props.type === 'mc-one' &&
              <div>
                <p className='card-text'>You just completed {+exercise === 0 ? 'the Pretest' : 'Exercise ' + exercise} of Wordset {wordset} of Level {level}, Section {section}.</p>
                <p className='card-text'>You got {numQuestions - wrongAnswers} out of {numQuestions} correct.</p>
                <p className='card-text'>Ready to keep learning?</p>
                <button className='btn btn-primary'onClick={this.incrementExercise}>Next</button>
              </div>
            }
            {/* section completion */}
            {
              this.props.quizCompleted && this.props.review &&
              <React.Fragment>
                <p className='card-text'>You've completed Level {level}, Section {section}! Please use the navigation above to select the next section or return home.</p>
              </React.Fragment>
            }
            {/* wordset completed */}
            {
              this.state.wordsetCompleted &&
              <React.Fragment>
                <p className='card-text'>You've completed this wordset! Please use the navigation above to select the next wordset or return home.</p>
              </React.Fragment>
            }
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
});
