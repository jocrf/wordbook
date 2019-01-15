export const getPlacement = (name) => {
  const fileName = getFile(name);
  return fetch(fileName)
    .then(response => response.json());
};

export const convertChapterName = (level, section) => {
  let str = 'level.section';
  console.log(str.replace('level', level).replace('section', section));
  return str.replace('level', level).replace('section', section);
};

export const getFile = (name) => {
  const fileNames = {
    0: '.public/placementdata.json',
    8: 'http://localhost:3000/level-8-trial.json'
  };
  return fileNames[name];
};

export const get = (level, section, wordset, exercise) => {
  const chapterName = convertChapterName(level, section);
  const fileName = getFile(level);
  return fetch(fileName)
    .then(response => response.json())
    .then(response => {
      for (let key in response) {
        if (response[key].title === chapterName) {
          return response[key];
        }
      }
    });
};
