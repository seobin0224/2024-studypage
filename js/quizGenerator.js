// quizGenerator.js

function loadQuizGenerator() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
      <h2 class="text-3xl font-bold mb-6">Quiz Generator</h2>
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 class="text-xl font-semibold mb-4">Generate Quiz</h3>
          <textarea id="lectureContent" class="w-full p-2 border border-gray-300 rounded mb-4" rows="5" placeholder="Enter lecture content here..."></textarea>
          <button id="generateQuiz" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Generate Quiz</button>
      </div>
      <div id="quizContainer" class="hidden space-y-4"></div>
  `;

  document
    .getElementById("generateQuiz")
    .addEventListener("click", generateQuiz);
}

function generateQuiz() {
  const lectureContent = document.getElementById("lectureContent").value;
  if (!lectureContent) {
    alert("Please enter some lecture content.");
    return;
  }

  // In a real application, this would make an API call to an AI service
  // For now, we'll use a mock quiz
  const mockQuiz = [
    {
      question: "What is the main purpose of an array in programming?",
      options: [
        "To store a single value",
        "To store multiple values of the same type",
        "To perform mathematical operations",
        "To create user interfaces",
      ],
      correctAnswer: 1,
    },
    {
      question:
        "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
    },
  ];

  displayQuiz(mockQuiz);
}

function displayQuiz(quiz) {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">Generated Quiz</h3>';
  quizContainer.classList.remove("hidden");

  quiz.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "bg-white p-6 rounded-lg shadow-md mb-4";
    questionElement.innerHTML = `
          <p class="font-semibold mb-2">Q${index + 1}. ${question.question}</p>
          <div class="space-y-2">
              ${question.options
                .map(
                  (option, optionIndex) => `
                  <label class="flex items-center">
                      <input type="radio" name="question${index}" value="${optionIndex}" class="mr-2">
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
    if (
      selectedAnswer &&
      parseInt(selectedAnswer.value) === question.correctAnswer
    ) {
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
