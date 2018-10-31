
const quiz1Container = document.createDocumentFragment();
const quiz1 = new Quiz(requestData);



quiz1.addEventListener('submit', function (event) {
  // need to establish which li should be selected in each list
  event.preventDefault();

  const selected = quiz1.querySelectorAll('input:checked');
  let correct = 0;
  let incorrect = 0;

  selected.forEach(function (input) {
    const fieldset = input.parentElement;
    if (input.classList.contains('answer')) {
      fieldset.classList.toggle('correct');
      correct++;
    } else {
      fieldset.classList.toggle('incorrect');
      incorrect++;
    }
    fieldset.disabled = true;
  });
  alert(`You got ${correct} correct and missed ${incorrect}.`);
});
//   const wordList = document.getElementsByClassName('word-options');
//   let selected = '';
//
//   for (const i = 0; i < wordList.length; i++)
//
//   // need to check if the :checked input is equal to the correct answer
//   // need to display correct or incorrect
// });
