const fs = require('fs');
const path = require('path');

const level = require('./copyedited-json/new-level-1-trial.json');

let sectionId = 1;

level.sections.forEach(section => {
  // section.wordsets.forEach(wordset => (
  //   fs.writeFileSync(
  //     path.join(__dirname, '/level-8', `level-8-wordset-${wordset.id}.json`),
  //     JSON.stringify(wordset, null, 2)
  //   )
  // ));
  section.reviewTest.id = sectionId;
  section.reviewTest.wordList.sort(function (a, b) {
    if (a.word < b.word) {
      return -1;
    }
    if (a.word > b.word) {
      return 1;
    }
    return 0;
  });
  // console.log(JSON.stringify(section.reviewTest.wordList, null, 2));
  fs.writeFileSync(
    path.join(__dirname, '../wordbook/public/level-1', `level-1-review-${sectionId}.json`),
    JSON.stringify(section.reviewTest, null, 2)
  );
  sectionId++;
});
