// quizGenerator.js

function loadQuizGenerator() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Quiz Generator</h2>
        <textarea id="lectureContent" class="w-full p-2 border rounded mb-4" rows="5" placeholder="Enter lecture content here..."></textarea>
        <button id="generateQuiz" class="bg-blue-500 text-white p-2 rounded mb-4">Generate Quiz</button>
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
  quizContainer.innerHTML = "";
  quizContainer.classList.remove("hidden");

  quiz.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "border p-4 rounded";
    questionElement.innerHTML = `
            <p class="font-semibold mb-2">${index + 1}. ${question.question}</p>
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
  submitButton.className = "bg-green-500 text-white p-2 rounded mt-4";
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

  alert(`You scored ${score} out of ${quiz.length}`);
}
