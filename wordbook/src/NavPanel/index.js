import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

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
    const { exercise, group } = this.props;
    if (group) {
      if (group < 8 && this.props.passed) { // hard-coded based on placement data
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
        case 'pretest':
          nextExercise = 1;
          break;
        case '3':
          nextExercise = null;
          break;
      }
    }
    if (nextExercise) {
      const currentUrl = this.props.match.url;
      const regex = /(\w+)$|\d$/;
      this.props.history.push(currentUrl.replace(regex, nextExercise));
    } else {
      this.setState({ wordsetCompleted: true });
    }
  }

  render () {
    // TODO: add type checker - if type 'review', say 'x', if type 'placement', say 'y', etc
    const { level, section, wordset, exercise, group } = this.props;
    return (
      <React.Fragment>
        {this.props.placement &&
          <React.Fragment>
            {
              +group === 0 && !this.props.quizCompleted &&
              <React.Fragment>
                <p>Ready to get started?</p>
                <button onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {
              !this.props.quizCompleted && +group > 0 &&
              <React.Fragment>
                <p>Ready to learn?</p>
                <button onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {
              !this.state.wordsetCompleted && this.props.quizCompleted &&
              <React.Fragment>
                <p>You've completed Group {+group + 1} of the placement quiz! Ready to keep going?</p>
                <button onClick={this.incrementExercise}>Ready</button>
              </React.Fragment>
            }
            {
              this.state.wordsetCompleted &&
              <React.Fragment>
                <p>You've placed into Level {+group + 1}!</p>
                <NavLink to={`/learning/level/${+group + 1}/section/1/wordset/1/exercise/0`}>Begin learning</NavLink>
              </React.Fragment>
            }
          </React.Fragment>
        }
        {!this.props.placement &&
          <React.Fragment>
            {
              this.props.quizCompleted && !this.state.wordsetCompleted && !this.props.review &&
              <div>
                <p>You just completed the {exercise} exercise of the {wordset} wordset of Level {level}, Section {section}.</p>
                {/* TODO add report of quiz results */}
                <p>Ready to keep learning?</p>
                <button onClick={this.incrementExercise}>Next</button>
              </div>
            }
            {
              this.props.quizCompleted && this.props.review &&
              <React.Fragment>
                <p>You've completed Level {level}, Section {section}! Please use the navigation above to select the next section or return home.</p>
              </React.Fragment>
            }
            {
              !this.props.quizCompleted &&
              <React.Fragment>
                <p>Ready to learn?</p>
                <button onClick={this.props.toggleQuizState}>Ready</button>
              </React.Fragment>
            }
            {
              this.state.wordsetCompleted &&
              <React.Fragment>
                <p>You've completed this wordset! Please use the navigation above to select the next wordset or return home.</p>
              </React.Fragment>
            }
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
);
