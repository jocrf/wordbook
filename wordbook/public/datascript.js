const fs = require('fs');
const path = require('path');

const level = require('./level-5-trial');

const newLevel = {sections: []};
// go through the chapters
for (var ch = 0; ch < level.length; ch++) {
  const chapter = level[ch];

  // organize them into sections
  // new section
  if (ch % 3 === 0) {
    newLevel.sections.push({wordsets: [], reviewTest: {}});
  }

  const sectionId = newLevel.sections.length - 1;
  const section = newLevel.sections[sectionId];

  // section = 3 chapters, review test
  // review test is in chapter % 3
  section.wordsets.push(chapter);
  if ('reviewTest' in chapter) {
    section.reviewTest = chapter.reviewTest;
    delete chapter.reviewTest;
  }
  // make sections
  // make review test a sibling of chapters
}

// retitle sections
newLevel.sections.forEach(function (section) {
  section.reviewTest.type = 'fitb';
  for (let i = 0; i < section.wordsets.length; i++) {
    const selection = section.wordsets[i];
    selection.id = i;
    const exercises = [];
    selection.pretest.type = 'mc-one';
    selection.pretest.id = 'pretest';
    selection.exercise_1.type = 'tf';
    selection.exercise_1.id = 1;
    selection.exercise_2.type = 'tf';
    selection.exercise_2.id = 2;
    selection.exercise_3.type = 'mc-all';
    selection.exercise_3.id = 3;
    exercises.push(selection.pretest, selection.exercise_1, selection.exercise_2, selection.exercise_3);
    selection.exercises = exercises;
    delete selection.pretest;
    delete selection.exercise_1;
    delete selection.exercise_2;
    delete selection.exercise_3;
  }
});

// add capped format of answers to review test
newLevel.sections.forEach(function (section) {
  let modWordList = [];
  section.reviewTest.wordList.forEach(function (word) {
    let obj = {word: `${word}`};
    section.reviewTest.questions.forEach(function (question) {
      if (question.answer) {
        question.correct = question.answer;
        delete question.answer;
      } else {
        console.log(question);
      }
      const answer = question.correct;
      const cappedAnswer = answer.toUpperCase();
      let shortenedAnswer;
      if (cappedAnswer.length > 5) {
        shortenedAnswer = cappedAnswer.slice(0, 4);
      } else {
        shortenedAnswer = cappedAnswer;
      }
      if (word.startsWith(shortenedAnswer)) {
        obj.answer = answer;
        question.word = word;
      }
    });
    modWordList.push(obj);
  });
  section.reviewTest.wordList = modWordList;
});

// console.log(JSON.stringify(newLevel, null, 2));

fs.writeFileSync(
  path.join(__dirname, 'new-level-5-trial.json'),
  JSON.stringify(newLevel, null, 2)
);
