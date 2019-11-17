import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import ExercisePage from '../ExercisePage';
import TableOfContents from '../TableOfContents';
import FixList from '../FixList';
import StorageModal from '../StorageModal';

export default withRouter(class LearningPage extends Component {
  constructor (props) {
    super(props);
    this.hideStorage = this.hideStorage.bind(this);
    this.showStorage = this.showStorage.bind(this);
    this.toggleToC = this.toggleToC.bind(this);
    this.state = {
      showStorage: false,
      showToC: true
    };
  }

  componentDidMount () {
    this.setState({ showStorage: true });
  }

  componentDidUpdate (prevProps) {
    if (this.state.showToC) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.showStorage();
      }
    }
  }

  showStorage () {
    this.setState({ showStorage: true });
  }

  hideStorage () {
    this.setState({ showStorage: false });
  }

  toggleToC () {
    this.setState((prevState) => ({ showToC: !prevState.showToC }));
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.showStorage &&
          <Route path='/learning/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?' render={({ match }) => <StorageModal
            level={match.params.level}
            section={match.params.section}
            wordset={match.params.wordset}
            exercise={match.params.exercise}
            setStorageState={this.props.setStorageState}
            useStorage={this.props.useStorage}
            declinedStorage={this.props.declinedStorage}
            hideStorage={this.hideStorage}
            tocVisible={this.state.showToC}
          />}
          />
        }
        <Route exact path='/learning/:fixType' render={({ match }) => <FixList
          {...match}
          fixType={match.params.fixType}
          toggleToC={this.toggleToC}
        />}
        />
        {/* <Route path='/learning/suffixes' component={FixList} /> */}
        {this.state.showToC &&
          <Route
            exact path='/learning/:l(level)?/:level?/:s(section)?/:section?/:w(wordset)?/:wordset?/:e(exercise)?/:exercise?'
            component={TableOfContents}
          />
        }
        <Route
          path='/learning/level/:level/section/:section/wordset/:wordset/exercise/:exercise'
          render={({ match }) => <ExercisePage
            showStorage={this.showStorage}
            level={match.params.level}
            section={match.params.section}
            wordset={match.params.wordset}
            exercise={match.params.exercise}
            toggleToC={this.toggleToC}
            url={match.url}
          />}
        />
        {/* if review test */}
        <Route
          path='/learning/level/:level/section/:section/review/:review'
          render={({ match }) => <ExercisePage
            level={match.params.level}
            section={match.params.section}
            review={match.params.review}
            toggleToC={this.toggleToC}
          />}
        />
      </React.Fragment>
    );
  }
});
