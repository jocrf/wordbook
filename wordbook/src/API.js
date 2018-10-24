export const get = () => {
  return fetch('/placementdata.json')
    .then(response => response.json())
}
