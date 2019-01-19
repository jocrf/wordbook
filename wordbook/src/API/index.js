export const getPlacement = () => {
  const fileName = getFile(0);
  return fetch(fileName)
    .then(response => response.json());
};

export const getFile = (name) => {
  const fileNames = {
    0: 'http://localhost:3000/placementdata.json',
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
