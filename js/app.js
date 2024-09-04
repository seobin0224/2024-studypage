// app.js

let currentPage = "dashboard";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  loadPage(currentPage);
  loadData();
});

function setupNavigation() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      loadPage(page);
    });
  });
}

function loadPage(page) {
  currentPage = page;
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = ""; // 기존 콘텐츠 삭제

  switch (page) {
    case "dashboard":
      if (typeof loadDashboard === "function") {
        loadDashboard();
      } else {
        console.error("loadDashboard 함수가 정의되지 않았습니다.");
      }
      break;
    case "subjectPlanner":
      if (typeof loadSubjectPlanner === "function") {
        loadSubjectPlanner();
      } else {
        console.error("loadSubjectPlanner 함수가 정의되지 않았습니다.");
      }
      break;
    case "progressTracker":
      if (typeof loadProgressTracker === "function") {
        loadProgressTracker();
      } else {
        console.error("loadProgressTracker 함수가 정의되지 않았습니다.");
      }
      break;
    case "quizGenerator":
      if (typeof loadQuizGenerator === "function") {
        loadQuizGenerator();
      } else {
        console.error("loadQuizGenerator 함수가 정의되지 않았습니다.");
      }
      break;
    default:
      appContainer.innerHTML = "<p>해당 페이지를 찾을 수 없습니다.</p>";
  }
}

function loadData() {
  if (!localStorage.getItem("subjects")) {
    localStorage.setItem("subjects", JSON.stringify([]));
  }
}
