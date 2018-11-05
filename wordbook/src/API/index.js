export const get = (name) => {
  const fileName = convertFileName(name);
  return fetch(fileName)
    .then(response => response.json());
};

export const convertFileName = (name) => {
  const fileNames = {
    'placement': '/placementdata.json'
  };
  return fileNames[name];
};
