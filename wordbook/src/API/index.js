export const getPlacement = (level) => {
  const fileName = getFile(0);
  return fetch(fileName)
    .then(response => response.json())
    .then(response => response.groups[level]);
};

export const getFile = (name) => {
  // TODO: if these files remain in the public folder, substitute '%PUBLIC_URL%' for first part of URL to build correctly, BUT the files won't be minified or post-processed if they stay here
  const fileNames = {
    0: 'http://localhost:3000/placementdata.json',
    3: 'http://localhost:3000/new-level-3-trial.json',
    6: 'http://localhost:3000/new-level-6-trial.json',
    7: 'http://localhost:3000/new-level-7-trial.json',
    8: 'http://localhost:3000/new-level-8-trial.json'
  };
  return fileNames[name];
};

export const getExercise = (level, section, wordset, exercise, review) => {
  // correct for zero-indexing
  const fileName = getFile(level);
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      let selectedSection = response.sections[section - 1];
      if (review) {
        // return review test early
        return selectedSection.reviewTest;
      }
      for (let key in selectedSection.wordsets) {
        if (+selectedSection.wordsets[key].id === (wordset - 1)) {
          let chapterData = {};
          chapterData.exercise = selectedSection.wordsets[key].exercises[exercise];
          chapterData.definitions = selectedSection.wordsets[key].definitions;
          return chapterData;
        }
      }
    });
};