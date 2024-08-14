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
  appContainer.innerHTML = ""; // Clear current content

  switch (page) {
    case "dashboard":
      loadDashboard();
      break;
    case "subjectPlanner":
      loadSubjectPlanner();
      break;
    case "progressTracker":
      loadProgressTracker();
      break;
    case "quizGenerator":
      loadQuizGenerator();
      break;
    default:
      appContainer.innerHTML = "<p>Page not found</p>";
  }
}

function loadData() {
  if (!localStorage.getItem("subjects")) {
    localStorage.setItem("subjects", JSON.stringify([]));
  }
}

// These functions will be defined in their respective files
function loadDashboard() {}
function loadSubjectPlanner() {}
function loadProgressTracker() {}
function loadQuizGenerator() {}
