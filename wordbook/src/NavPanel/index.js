import React, { Component } from 'react';
import levels from '../TableOfContents/levels-config';
import { withRouter } from 'react-router-dom';

export default withRouter(class NavPanel extends Component {
  constructor (props) {
    super(props);
    this.incrementExercise = this.incrementExercise.bind(this);
    this.state = {
      increment: false
    };
  }

  incrementExercise () {
    let nextExercise = null;
    const { level, section, wordset, exercise } = this.props;
    const currentWordsetExercises = levels[level - 1].sections[section - 1].wordsets[wordset - 1].exercises;
    switch (exercise) {
      case '1':
      case '2':
        nextExercise = +exercise + 1;
        break;
      case 'pretest':
        nextExercise = 1;
        break;
    }
    if (nextExercise) {
      const currentUrl = this.props.match.url;
      const regex = /(\w+)$|\d$/;
      this.props.history.push(currentUrl.replace(regex, nextExercise));
    } else {
      // show message that the wordset is completed via state
    }
  }

  render () {
    const { level, section, wordset, exercise } = this.props;
    return (
      <React.Fragment>
        {this.props.quizCompleted &&
          <div>
            <p>You just completed the {exercise} exercise of the {wordset} wordset of Level {level}, Section {section}.</p>
            {/* TODO add report of quiz results */}
            <p>Ready to keep learning?</p>
            <button onClick={this.incrementExercise}>Next</button>
          </div>
        }
        {!this.props.quizCompleted &&
          <React.Fragment>
            <p>Ready to learn?</p>
            <button onClick={this.props.toggleQuizState}>Ready</button>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
);
