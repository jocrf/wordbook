export const getPlacement = (level) => {
  const fileName = getFile(0);
  let chapterData = {};
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      chapterData.exercise = response.groups[level];
      return chapterData;
    });
};

export const getFile = (name) => {
  // TODO: if these files remain in the public folder, substitute '%PUBLIC_URL%' for first part of URL to build correctly, BUT the files won't be minified or post-processed if they stay here
  const fileNames = {
    'frontBackMatter': 'http://localhost:3000/front-back-matter.json',
    0: 'http://localhost:3000/placementdata.json',
    2: 'http://localhost:3000/new-level-2-trial.json',
    3: 'http://localhost:3000/new-level-3-trial.json',
    4: 'http://localhost:3000/new-level-4-trial.json',
    5: 'http://localhost:3000/new-level-5-trial.json',
    6: 'http://localhost:3000/new-level-6-trial.json',
    7: 'http://localhost:3000/new-level-7-trial.json',
    8: 'http://localhost:3000/new-level-8-trial.json'
  };
  return fileNames[name];
};

export const getExercise = (level, section, wordset, exercise, review) => {
  // correct for zero-indexing
  const fileName = getFile(level);
  let chapterData = {};
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      let selectedSection = response.sections[section - 1];
      if (review) {
        // return review test early
        chapterData.exercise = selectedSection.reviewTest;
      }
      for (let key in selectedSection.wordsets) {
        if (selectedSection.wordsets[key].id === wordset) {
          chapterData.exercise = selectedSection.wordsets[key].exercises[exercise];
          chapterData.definitions = selectedSection.wordsets[key].definitions;
        }
      }
      return chapterData;
    });
};

export const getInstructions = (exercise, review, placement) => {
  const fileName = getFile('frontBackMatter');
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      if (placement) {
        return response.instructions.placement;
      } else if (review) {
        return response.instructions.review;
      } else if (exercise) {
        return response.instructions.exercises[exercise];
      }
    });
};

export const getPhonetic = (word) => {
  let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=e2c2a55f-3f03-492d-b297-eff361b6a0cb`;

  // fetch word object
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      // presume we just want the first def
      let wordPronun = response[0].hwi.prs;
      // generate url for audio file (may have multiple pronunciations)
      wordPronun.forEach(pronun => {
        let audio = '';
        if (!pronun.sound) {
          return;
        } else {
          audio = pronun.sound.audio;
        }
        let subdirectory = '';
        switch (audio) {
          case (audio.match(/bix.*/)):
            subdirectory = 'bix';
            break;
          case (audio.match(/gg.*/)):
            subdirectory = 'gg';
            break;
          case (audio.match(/\W\d*/)):
            subdirectory = 'number';
            break;
          default:
            subdirectory = audio.slice(0, 1);
        }
        let audioUrl = `https://media.merriam-webster.com/soundc11/${subdirectory}/${audio}.wav`;
        pronun.sound.audioUrl = audioUrl;
      });
      return wordPronun;
    });
};
