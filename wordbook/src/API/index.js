export const get = (name) => {
  const fileName = convertFileName(name);
  return fetch(fileName)
    .then(response => response.json());
};

export const convertFileName = (name) => {
  const fileNames = {
    0: '/placementdata.json',
    1: '/level_1.json'
  };
  return fileNames[name];
};

export default {
  get: get
};
