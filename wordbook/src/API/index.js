export const urlPrefix = 'https://jocrf.github.io/wordbook/';

// type === 'prefixes' or 'suffixes'
export const getContent = (type) => {
  const fileName = getFile('frontBackMatter');
  return fetch(fileName)
    .then(response => response.json())
    .then(response => response.backmatter[type]);
};

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
    'frontBackMatter': `${urlPrefix}/front-back-matter.json`,
    0: `${urlPrefix}/placementdata.json`,
    1: `${urlPrefix}/level-1`,
    2: `${urlPrefix}/level-2`,
    3: `${urlPrefix}/level-3`,
    4: `${urlPrefix}/level-4`,
    5: `${urlPrefix}/level-5`,
    6: `${urlPrefix}/level-6`,
    7: `${urlPrefix}/level-7`,
    8: `${urlPrefix}/level-8`
  };
  return fileNames[name];
};

export const getExercise = (level, section, wordset, exercise, review) => {
  // correct for zero-indexing
  const folderName = getFile(level);
  let chapterData = {};
  let fileName = folderName;
  if (review) {
    fileName += `/level-${level}-review-${review}.json`;
  } else {
    fileName += `/level-${level}-wordset-${wordset}.json`;
  }
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      if (review) {
        chapterData.exercise = response;
      } else {
        chapterData.definitions = response.definitions;
        chapterData.exercise = response.exercises[exercise];
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

// check if we can use local storage, function copied from MDN:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
export const storageAvailable = (type) => {
  try {
    var storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    // eslint-disable-next-line
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
};
