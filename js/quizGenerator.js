function loadQuizGenerator() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <h2 class="text-3xl font-bold mb-6">Quiz Generator</h2>
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-xl font-semibold mb-4">Upload Quiz Content</h3>
      <input type="file" id="quizFile" accept=".txt" class="mb-4">
      <button id="uploadQuiz" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Upload</button>
    </div>
    <div id="quizContainer" class="hidden space-y-4"></div>
  `;

  document.getElementById("uploadQuiz").addEventListener("click", uploadQuiz);
}

function uploadQuiz() {
  const fileInput = document.getElementById("quizFile");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const quiz = parseQuizContent(content);
      displayQuiz(quiz);
    };
    reader.readAsText(file);
  } else {
    alert("Please select a quiz file.");
  }
}

function parseQuizContent(content) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const quiz = [];
  let question = "";
  let correctAnswer = "";

  lines.forEach((line) => {
    if (
      line.startsWith("1.") ||
      line.startsWith("2.") ||
      line.startsWith("3.") ||
      line.startsWith("4.")
    ) {
      if (question) {
        quiz.push({ question, correctAnswer });
      }
      question = line; // 새로운 질문 시작
      correctAnswer = ""; // 정답 초기화
    } else if (line.startsWith("-")) {
      const option = line.replace("-", "").trim();
      if (!correctAnswer) correctAnswer = option; // 첫 번째 옵션을 정답으로 설정
    }
  });

  // 마지막 질문 추가
  if (question) {
    quiz.push({ question, correctAnswer });
  }

  return quiz;
}

function generateRandomOptions(correctAnswer, allAnswers) {
  const wrongAnswers = allAnswers.filter((answer) => answer !== correctAnswer);
  const selectedWrongAnswers = [];

  // 랜덤으로 3개의 틀린 답변 선택
  while (selectedWrongAnswers.length < 3 && wrongAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
    selectedWrongAnswers.push(wrongAnswers[randomIndex]);
    wrongAnswers.splice(randomIndex, 1); // 중복 방지
  }

  // 모든 선택지를 섞고 반환
  const options = [correctAnswer, ...selectedWrongAnswers];
  return options.sort(() => Math.random() - 0.5);
}

function displayQuiz(quiz) {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">Generated Quiz</h3>';
  quizContainer.classList.remove("hidden");

  quiz.forEach((questionItem, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "bg-white p-6 rounded-lg shadow-md mb-4";

    // 예시의 모든 옵션을 위해 사용된 정답을 제외한 나머지 선택지를 준비
    const allAnswers = quiz.map((q) => q.correctAnswer);
    const options = generateRandomOptions(
      questionItem.correctAnswer,
      allAnswers
    );

    questionElement.innerHTML = `
      <p class="font-semibold mb-2">Q${index + 1}. ${questionItem.question}</p>
      <div class="space-y-2">
        ${options
          .map(
            (option) => `
          <label class="flex items-center">
            <input type="radio" name="question${index}" value="${option}" class="mr-2">
            ${option}
          </label>
        `
          )
          .join("")}
      </div>
    `;
    quizContainer.appendChild(questionElement);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Quiz";
  submitButton.className =
    "bg-accent-green text-white px-4 py-2 rounded hover:bg-green-600 transition-colors";
  submitButton.addEventListener("click", () => checkAnswers(quiz));
  quizContainer.appendChild(submitButton);
}

function checkAnswers(quiz) {
  let score = 0;
  quiz.forEach((question, index) => {
    const selectedAnswer = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
      score++;
    }
  });

  const resultElement = document.createElement("div");
  resultElement.className = "bg-white p-6 rounded-lg shadow-md mt-4";
  resultElement.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">Quiz Results</h3>
    <p>You scored ${score} out of ${quiz.length}</p>
  `;

  const quizContainer = document.getElementById("quizContainer");
  quizContainer.appendChild(resultElement);
}
