export const getPlacement = (name) => {
  const fileName = convertFileName(name);
  return fetch(fileName)
    .then(response => response.json());
};

export const convertChapterName = (name, chapter) => {
  let str = 'level.chapter.pdf';
  console.log(str.replace('level', name).replace('chapter', chapter));
  return str.replace('level', name).replace('chapter', chapter);
};

export const convertFileName = (name) => {
  const fileNames = {
    0: '/placementdata.json',
    1: '/level_1.json'
  };
  return fileNames[name];
};

export const get = (name, chapter) => {
  const fileName = convertFileName(name);
  const arrItem = convertChapterName(name, chapter);
  console.log(arrItem);
  return fetch(fileName)
    .then(response => response.filter(chapter => chapter.file_name === arrItem))
    .then(response => response.json());
};
