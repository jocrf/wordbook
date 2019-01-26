export const getPlacement = (level) => {
  const fileName = getFile(0);
  return fetch(fileName)
    .then(response => response.json())
    .then(response => response.groups[level]);
};

export const getFile = (name) => {
  // TODO: hard-coded relative paths below
  const fileNames = {
    0: 'http://localhost:3000/placementdata.json',
    3: 'http://localhost:3000/new-level-3-trial.json',
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
          return selectedSection.wordsets[key].exercises[exercise];
        }
      }
    });
};
