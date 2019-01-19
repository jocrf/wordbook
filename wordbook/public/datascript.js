const fs = require('fs');
const path = require('path');

const level = require('./level-8-trial.json');

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

// TODO: add in type for each exercise
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
})

// console.log(JSON.stringify(newLevel, null, 2));

fs.writeFileSync(
    path.join(__dirname, 'new-level-8-trial.json'),
    JSON.stringify(newLevel, null, 2)
);