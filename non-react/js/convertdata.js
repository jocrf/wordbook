/* global fetch */
const model = {
  init: function () {
    // fetch data for first group in placement quiz
    const model = this;
    this.instructions = '';
    this.quiz1 = {};
    fetch('../placementdata.json')
      .then(response => response.json())
      .then(function (response) {
        console.log(response);
        model.instructions = response.quiz1.instructions;
        model.quiz1 = response.quiz1.groups[0];
        return response.quiz1;
      })
      .then(function (response) {
        controller.currentQuiz = model.quiz1;
        return controller.currentQuiz;
      })
      .catch(e => console.log(e));
  },
  getNewQuizData: function () {

  }
};

const controller = {
  init: function () {
    const controller = this;
    controller.instructions = '';
    controller.currentQuiz = {}; // track current quiz so it knows what to get next
    model.init(); // get data
    console.log(controller.currentQuiz);
    view.init(); // display data
  },
  getNewQuiz: function () {
    // request quiz from model
    // return this.currentQuiz;
  },
  scoreQuiz: function () {
    // take input from view and check answers
  }
};

const view = {
  init: function () {
    const view = this;
    controller.getNewQuiz();
    this.templateQuiz();
    this.renderQuiz();
    // get quiz 1
    // template quiz 1
    // render quiz 1
    // add event listeners to score quiz
  },
  renderQuiz: function (quiz) {

  },
  renderAnswers: function () {

  },
  templateQuiz: function () {
    const group = controller.currentQuiz;
    console.log(group);
    const titleString = group.title.replace(/\s+/g, '-').toLowerCase();
    const sectionTemplate = `
      <section class="quiz ${group}">
      <h2>${group.title}</h2>
      <form id="${titleString}">
      <fieldset>
      <legend>${group.questions[0].prompt}</legend>
      </fieldset>
    `;
    const questionTemplate = `
    <input type="radio" name="${titleString}-0" value="${group.questions[0].answers[0].word}" id="${titleString}-0-1" required></input>
    <label for="${titleString}-0-1">${group.questions[0].answers[0].word}</label>
    `;
    return group;
  }
};

controller.init();

// function Quiz (quizObject) {
//   this.quiz = quizObject;
//   this.instructions = this.quiz.instructions;
//   this.group1 = this.quiz.groups[0]; // TODO: make more reusable with a loop?
// }
//
// Quiz.prototype.generateGroup = function (group)
//
// Quiz.prototype.appendGroup = function (generatedGroup) {
//   // TODO: add sectionTemplate to the DOM, use a loop to populate // and insert contents of questionTemplates for each word
//   const quiz = document.createDocumentFragment();
//   const content = generatedGroup;
//   quiz.append(content);
//   document.body.append(quiz);
//   // option in the fieldset
//   // TODO: do this loop for each question in the group
// };
