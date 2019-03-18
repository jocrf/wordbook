const fs = require('fs');
const path = require('path');

const level = require('./new-level-1-trial.json');

let sectionId = 1;

level.sections.forEach(section => {
  section.wordsets.forEach(wordset => (
    // console.log(JSON.stringify(wordset, null, 2));
    fs.writeFileSync(
      path.join(__dirname, '/level-1', `level-1-wordset-${wordset.id}.json`),
      JSON.stringify(wordset, null, 2)
    )
  ));
  section.reviewTest.id = sectionId;
  fs.writeFileSync(
    path.join(__dirname, '/level-1', `level-1-review-${sectionId}.json`),
    JSON.stringify(section.reviewTest, null, 2)
  );
  sectionId++;
});

// console.log(path.join(__dirname, '/level-1'));

// console.log(JSON.stringify(newLevel, null, 2));

// fs.writeFileSync(
//   path.join(__dirname, 'new-level-1-trial.json'),
//   JSON.stringify(newLevel, null, 2)
// );
