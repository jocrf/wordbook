const fs = require('fs');
const path = require('path');
const lev = require('fast-levenshtein');

const levelNum = 1;

const level = require(`./copyedited-json/level-${levelNum}-trial`);

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
    selection.id = selection.title.slice(2);
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
    let scoredQuestions = section.reviewTest.questions.map(function (question) {
      if (question.answer) {
        question.correct = question.answer;
        delete question.answer;
      } else {
        console.log(question);
      }
      // if the answer is much longer than the word, that will result in a very high distance - crop the answer to the length of the word and then compare for better accuracy
      const answer = question.correct.slice(0, word.length);
      const cappedAnswer = answer.toUpperCase();
      const distance = lev.get(word, cappedAnswer);
      return {
        question: question,
        distance: distance
      };
    });
    const correctQuestion = scoredQuestions.sort((a, b) => a.distance - b.distance)[0].question;
    correctQuestion.word = word;
    let answerObj = {
      word: word,
      answer: correctQuestion.correct
    };
    if (correctQuestion.alternate) {
      answerObj.alternate = correctQuestion.alternate;
    }
    modWordList.push(answerObj);
  });
  section.reviewTest.wordList = modWordList;
});

// format deftext to render as HTML
// handle underscores as italics, add smart quotes, add <p> tags
newLevel.sections.forEach(section => {
  section.wordsets.forEach(wordset => {
    const words = Object.keys(wordset.definitions);
    words.forEach(word => {
      // look for underscores surrounding italics
      const openMatch = /_(?=\w|-)/g;
      const closeMatch = /_(?!\w|-)/g;
      // look for open and close quotes
      const openQuote = /"(?=\w|')/g;
      const closeQuote = /"(?= |$)/g;
      const openSingleQuote = /'(?=[A-Z])/g;
      const closeSingleQuote = /'/g;
      // look for line breaks
      const newline = /\n/g;
      // look for text linking to -fix lists
      const suffixMatch = /See .* under Suffixes./g;
      const prefixMatch = /See .* under Prefixes./g;
      // replace regexp matches with new HTML tags
      let openText = wordset.definitions[word].deftext.replace(openMatch, '<i class="def-ital">');
      let closeText = openText.replace(closeMatch, '</i>');
      let openQuoteText = closeText.replace(openQuote, '“');
      let closeQuoteText = openQuoteText.replace(closeQuote, '”');
      let openSingleQuoteText = closeQuoteText.replace(openSingleQuote, '‘');
      let closeSingleQuoteText = openSingleQuoteText.replace(closeSingleQuote, '’');
      let newText = closeSingleQuoteText.replace(newline, '</p><p>');
      // remove -fix links from deftext and add them to object as separate properties
      if (suffixMatch.test(newText)) {
        const matcher = newText.match(suffixMatch);
        const index = newText.indexOf('See');
        let part1 = newText.slice(0, index);
        let part2 = newText.slice(index + matcher[0].length);
        newText = part1 + part2;
        wordset.definitions[word].suffix = matcher;
      }
      if (prefixMatch.test(newText)) {
        const matcher = newText.match(prefixMatch);
        const index = newText.indexOf('See');
        let part1 = newText.slice(0, index);
        let part2 = newText.slice(index + matcher[0].length);
        newText = part1 + part2;
        wordset.definitions[word].prefix = matcher;
      }
      // reassign new text with open and close <p>
      wordset.definitions[word].deftext = '<p class="definition">' + newText + '</p>';
    });
  });
});

let sectionId = 1;

newLevel.sections.forEach(section => {
  section.wordsets.forEach(wordset => (
    fs.writeFileSync(
      path.join(__dirname, `../wordbook/public/level-${levelNum}`, `level-${levelNum}-wordset-${wordset.id}.json`),
      JSON.stringify(wordset, null, 2)
    )
  ));
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
    path.join(__dirname, `../wordbook/public/level-${levelNum}`, `level-${levelNum}-review-${sectionId}.json`),
    JSON.stringify(section.reviewTest, null, 2)
  );
  sectionId++;
});

// console.log(JSON.stringify(newLevel, null, 2));

// fs.writeFileSync(
//   path.join(__dirname, 'new-level-1-trial.json'),
//   JSON.stringify(newLevel, null, 2)
// );
