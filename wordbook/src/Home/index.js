import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render () {
    return (
      <React.Fragment>
        <div className='jumbotron bg-primary col-lg-8 mx-auto'>
          <h1 className='display-4 text-light'>
            Welcome to the Wordbook App.
          </h1>
          <hr className='my-4 bg-light' />
          <div className='container'>
            <p className='lead text-light'>
              WORDBOOK is a unique vocabulary building program created by the <a href='https://www.jocrf.org' className='dark-bg-link'>Johnson O'Connor Research Foundation, Inc.</a>, a nonprofit organization that has been conducting aptitude and vocabulary research since 1922.
            </p>
          </div>
        </div>
        <div className='container col-lg-10 mx-auto'>
          <h2 className='text-dark'>
            How does it work?
          </h2>
          <div className='container'>
            <p className='text-dark'>
              The 1,440 words in WORDBOOK are split into eight levels of increasing difficulty. The placement test below will tell you which level is right for your current word knowledge. Start at the beginning of the level you place into. These will be words you are ready to learn, words that are at the borderline of your knowledge.
            </p>
            <p className='text-dark'>
              Each level contains twelve chapters, or wordsets, which are split into four sections. Each wordset begins with a pretest consisting of fifteen multiple choice items covering the  words in the wordset. You take the pretest to discover which words you do not already know, and to learn the meaning and pronunciation of these words.
            </p>
            <p className='text-dark'>
              After the pretest, three exercises give you opportunities to test your understanding of the words in the wordset. There is a review test after every three wordsets to check how well you have retained what you have studied before you move on to the next section.
            </p>
            <p className='text-dark'>
              Begin at the appropriate level, then work through the rest of the program. The result will be a larger vocabulary and better communication skills in school or on the job.
            </p>
          </div>
        </div>
        <div className='container col-lg-10 mx-auto bg-light rounded pt-3'>
          <h2 className='text-dark'>
            Get started
          </h2>
          <hr />
          <div className='container d-md-flex p-0'>
            <div className='container d-flex flex-column justify-content-between'>
              <p className='text-dark'>
                If this is your first visit, take the placement quiz.
              </p>
              <Link to='/placement/0' className='btn btn-orange'>Placement Quiz</Link>
            </div>
            <div className='container d-flex flex-column justify-content-between'>
              <p className='text-dark'>
                Otherwise, continue learning.
              </p>
              <Link to='/learning' className='btn btn-orange'>Select Your Level</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
