function loadQuizGenerator() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <h2 class="text-3xl font-bold mb-6">Quiz Generator</h2>
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-xl font-semibold mb-4">Upload Study Material</h3>
      <input type="file" id="quizFile" accept=".txt" class="mb-4">
      <div class="flex gap-4">
        <input 
          type="number" 
          id="questionCount" 
          min="1" 
          max="20" 
          value="10" 
          class="border rounded px-2 py-1 w-24"
          placeholder="문제 수"
        >
        <button id="uploadQuiz" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          문제 생성
        </button>
      </div>
    </div>
    <div id="quizContainer" class="hidden space-y-4"></div>
  `;

  document.getElementById("uploadQuiz").addEventListener("click", uploadQuiz);
}

function uploadQuiz() {
  const fileInput = document.getElementById("quizFile");
  const questionCount =
    parseInt(document.getElementById("questionCount").value) || 10;

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const quiz = generateBlankQuiz(content, questionCount);
      displayQuiz(quiz);
    };
    reader.readAsText(file);
  } else {
    alert("Please select a text file.");
  }
}

function generateBlankQuiz(content, questionCount) {
  // 줄 단위로 분리하고 번호/특수문자 제거
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/^\d+\s+/, "")) // 앞의 번호 제거
    .map((line) => line.replace(/^[◦\t]+/, "")); // 특수문자 및 탭 제거

  // 키워드-설명 쌍으로 분리
  const concepts = lines
    .map((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        return {
          keyword: parts[0].trim(),
          description: parts[1].trim(),
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  // 문제 유형 생성 함수들
  const questionGenerators = [
    // 유형 1: 개념 설명 후 키워드 물어보기
    (concept) => ({
      question: `다음 설명에 해당하는 용어는 무엇인가요?\n\n"${concept.description}"`,
      answer: concept.keyword,
      type: "keyword",
    }),

    // 유형 2: 키워드 제시 후 빈칸 채우기
    (concept) => {
      const description = concept.description;
      // 중요 키워드나 구절을 찾아 빈칸으로 대체
      const keywords =
        description.match(/[가-힣a-zA-Z]+(?:[(\s])*[가-힣a-zA-Z]+/g) || [];
      if (keywords.length > 0) {
        const targetWord =
          keywords[Math.floor(Math.random() * keywords.length)];
        return {
          question: `${
            concept.keyword
          }에 대한 설명입니다. 빈칸에 들어갈 알맞은 말을 고르세요.\n\n${description.replace(
            targetWord,
            "_____"
          )}`,
          answer: targetWord,
          type: "blank",
        };
      }
      return null;
    },

    // 유형 3: O/X 퀴즈 생성
    (concept) => {
      const isCorrect = Math.random() < 0.5;
      if (isCorrect) {
        return {
          question: `다음 설명이 맞으면 O, 틀리면 X를 고르세요.\n\n${concept.keyword}은(는) ${concept.description}`,
          answer: "O",
          type: "ox",
        };
      } else {
        // 다른 개념의 설명을 가져와 잘못된 설명 생성
        const otherConcepts = concepts.filter(
          (c) => c.keyword !== concept.keyword
        );
        const wrongDescription =
          otherConcepts[Math.floor(Math.random() * otherConcepts.length)]
            .description;
        return {
          question: `다음 설명이 맞으면 O, 틀리면 X를 고르세요.\n\n${concept.keyword}은(는) ${wrongDescription}`,
          answer: "X",
          type: "ox",
        };
      }
    },
  ];

  // 퀴즈 생성
  const quiz = [];
  const usedConcepts = new Set();

  while (quiz.length < questionCount && concepts.length > usedConcepts.size) {
    // 랜덤하게 개념 선택
    let concept;
    do {
      concept = concepts[Math.floor(Math.random() * concepts.length)];
    } while (usedConcepts.has(concept.keyword));

    // 랜덤하게 문제 유형 선택
    const generator =
      questionGenerators[Math.floor(Math.random() * questionGenerators.length)];
    const question = generator(concept);

    if (question) {
      quiz.push(question);
      usedConcepts.add(concept.keyword);
    }
  }

  return quiz;
}

function displayQuiz(quiz) {
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">학습 퀴즈</h3>';
  quizContainer.classList.remove("hidden");

  quiz.forEach((item, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "bg-white p-6 rounded-lg shadow-md mb-4";

    let inputHTML = "";
    switch (item.type) {
      case "ox":
        inputHTML = `
          <div class="space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" name="answer${index}" value="O" class="mr-2">
              <span>O</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="answer${index}" value="X" class="mr-2">
              <span>X</span>
            </label>
          </div>
        `;
        break;
      case "keyword":
      case "blank":
        inputHTML = `
          <input 
            type="text" 
            class="border rounded px-3 py-2 w-full"
            id="answer${index}"
            placeholder="답을 입력하세요"
          >
        `;
        break;
    }

    questionElement.innerHTML = `
      <p class="font-semibold mb-2">Q${index + 1}.</p>
      <p class="mb-4 whitespace-pre-line">${item.question}</p>
      ${inputHTML}
      <div class="hidden mt-2 text-sm" id="feedback${index}"></div>
    `;

    quizContainer.appendChild(questionElement);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "정답 제출";
  submitButton.className =
    "bg-accent-green text-white px-4 py-2 rounded hover:bg-green-600 transition-colors";
  submitButton.addEventListener("click", () => checkAnswers(quiz));
  quizContainer.appendChild(submitButton);
}

function checkAnswers(quiz) {
  let score = 0;

  quiz.forEach((item, index) => {
    let userAnswer;
    if (item.type === "ox") {
      const selected = document.querySelector(
        `input[name="answer${index}"]:checked`
      );
      userAnswer = selected ? selected.value : "";
    } else {
      userAnswer = document.getElementById(`answer${index}`).value.trim();
    }

    const feedback = document.getElementById(`feedback${index}`);
    feedback.classList.remove("hidden");

    // 답안 비교 (대소문자 무시)
    const isCorrect = userAnswer.toLowerCase() === item.answer.toLowerCase();

    if (isCorrect) {
      score++;
      feedback.className = "mt-2 text-sm text-green-600";
      feedback.innerHTML = `
        <p>정답입니다!</p>
        <p class="mt-1">정답: ${item.answer}</p>
      `;
    } else {
      feedback.className = "mt-2 text-sm text-red-600";
      feedback.innerHTML = `
        <p>오답입니다.</p>
        <p class="mt-1">정답: ${item.answer}</p>
      `;
    }
  });

  const resultElement = document.createElement("div");
  resultElement.className = "bg-white p-6 rounded-lg shadow-md mt-4";
  resultElement.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">퀴즈 결과</h3>
    <p>총점: ${score}점 / ${quiz.length}점</p>
  `;

  quizContainer.appendChild(resultElement);
}
