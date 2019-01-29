import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ExercisePage from '../ExercisePage';
import TableOfContents from '../TableOfContents';

export default class LearningPage extends Component {
  render () {
    return (
      <React.Fragment>
        <Route path='/learning/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?' component={TableOfContents} />
        <Route
          path='/learning/level/:level/section/:section/wordset/:wordset/exercise/:exercise'
          render={({ match }) => <ExercisePage
            level={match.params.level}
            section={match.params.section}
            wordset={match.params.wordset}
            exercise={match.params.exercise}
          />}
        />
        {/* if review test */}
        <Route
          path='/learning/level/:level/section/:section/review/:review'
          render={({ match }) => <ExercisePage
            level={match.params.level}
            section={match.params.section}
            review={match.params.review}
          />}
        />
      </React.Fragment>
    );
  }
}
