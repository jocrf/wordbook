const fs = require('fs');
const path = require('path');

const level = require('./new-level-8-trial.json');

let sectionId = 1;

level.sections.forEach(section => {
  section.wordsets.forEach(wordset => (
    // console.log(JSON.stringify(wordset, null, 2));
    fs.writeFileSync(
      path.join(__dirname, '/level-8', `level-8-wordset-${wordset.id}.json`),
      JSON.stringify(wordset, null, 2)
    )
  ));
  section.reviewTest.id = sectionId;
  fs.writeFileSync(
    path.join(__dirname, '/level-8', `level-8-review-${sectionId}.json`),
    JSON.stringify(section.reviewTest, null, 2)
  );
  sectionId++;
});
