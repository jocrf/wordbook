export const getPlacement = (name) => {
  const fileName = getFile(name);
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

export const getExercise = (level, section, wordset, exercise) => {
  console.log('in API Call getting exercise ' + exercise);
  // correct for zero-indexing
  const fileName = getFile(level);
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      let selectedSection = response.sections[section - 1];
      for (let key in selectedSection.wordsets) {
        if (+selectedSection.wordsets[key].id === (wordset - 1)) {
          return selectedSection.wordsets[key].exercises[exercise];
        }
      }
    });
};
