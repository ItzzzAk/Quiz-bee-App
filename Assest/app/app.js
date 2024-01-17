
  const strtBtn = document.querySelector(".start-btn");
  const popUp = document.querySelector(".popup-info");
  const exitBtn = document.querySelector(".exit-btn");
  const main = document.querySelector(".main");
  const ContiBtn = document.querySelector(".continue-btn");
  const quizSection = document.querySelector(".quiz-section");
  const quizBox = document.querySelector(".quiz-box");
  const resultBox = document.querySelector(".result-box");
  const nextBtn = document.querySelector(".next-btn");
  const optionList = document.querySelector(".option-list");
  const tryAgainBtn = document.querySelector(".tryAgain-btn");
  const goHomebtn = document.querySelector(".goHome-btn");


function ClickBtns() {
  strtBtn.onclick = () => {
    popUp.classList.add("active");
    main.classList.add("active");
  };

  exitBtn.onclick = () => {
    popUp.classList.remove("active");
    main.classList.remove("active");
  };

  ContiBtn.onclick = () => {
    quizSection.classList.add("active");
    popUp.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");
    showQuestions(0);
    questionCounter(1);
    headerScore();
  };

  tryAgainBtn.onclick = () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
  };
  goHomebtn.onclick = () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
  };
}

function popUpDets() {
  let questionCount = 0;
  let questionNumb = 1;
  let userScore = 0;

  nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);

      questionNumb++;
      questionCounter(questionNumb);
      nextBtn.classList.add("remove");
    } else {
      showResultBox();
    }
  };

  // Getting questions and options from the array
  function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = "";
    for (let i = 0; i < questions[index].option.length; i++) {
      optionTag += `<div class="option"><span>${questions[index].option[i]}</span></div>`;
    }

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)");
    }
  }

  let allOptions; // Declare allOptions outside the function

  function optionSelected(answer) {
    let userAnswer = answer.textContent.trim().toLowerCase();
    let correctAnswer = questions[questionCount].answer.toLowerCase();

    // Update allOptions whenever needed
    allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
      answer.classList.add("correct");
      userScore += 1;
      headerScore();
    } else {
      answer.classList.add("incorrect");

      // Iterate through all options and highlight the correct answer
      for (let i = 0; i < allOptions; i++) {
        let option = optionList.children[i];
        if (option.textContent.trim().toLowerCase() === correctAnswer) {
          option.classList.add("correct");
        }
      }
      // If user has selected, disable all options
      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }
    }
    nextBtn.classList.add("active");
  }

  function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
  }

  function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
  }

  function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");

    let progressStartValue = -1;
    let progressEndValue = Math.max((userScore / questions.length) * 100, 0);
    let speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#5d18f3 ${
        progressStartValue * 3.6
      }deg, rgba(255,255,255,.1) ${progressStartValue * 3.6}deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
}


ClickBtns();
popUpDets();
