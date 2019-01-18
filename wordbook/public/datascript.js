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
    for (let i = 0; i < section.wordsets.length; i++) {
        section.wordsets[i].wordset = i;
    }
})

fs.writeFileSync(
    path.join(__dirname, 'new-level-8-trial.json'),
    JSON.stringify(newLevel, null, 2)
);