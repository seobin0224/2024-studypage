document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("home-link");
  const setGoalsLink = document.getElementById("set-goals-link");
  const settingsLink = document.getElementById("settings-link");
  const logoutButton = document.getElementById("logout-button");
  const homeSection = document.getElementById("home-section");
  const studyGoalsSection = document.getElementById("study-goals-section");
  const settingsSection = document.getElementById("settings-section");
  const loginSection = document.getElementById("login-section");
  const goalList = document.getElementById("goal-list");

  homeLink.addEventListener("click", () => {
    homeSection.style.display = "block";
    studyGoalsSection.style.display = "none";
    settingsSection.style.display = "none";
    loginSection.style.display = "none";
  });

  setGoalsLink.addEventListener("click", () => {
    homeSection.style.display = "none";
    studyGoalsSection.style.display = "block";
    settingsSection.style.display = "none";
    loginSection.style.display = "none";
  });

  settingsLink.addEventListener("click", () => {
    homeSection.style.display = "none";
    studyGoalsSection.style.display = "none";
    settingsSection.style.display = "block";
    loginSection.style.display = "none";
  });

  logoutButton.addEventListener("click", () => {
    // 로그아웃 시 로그인 화면으로 이동
    homeSection.style.display = "none";
    studyGoalsSection.style.display = "none";
    settingsSection.style.display = "none";
    loginSection.style.display = "block";
    goalList.innerHTML = ""; // 목표 목록 초기화 (옵션)
  });

  document.getElementById("set-goal").addEventListener("click", () => {
    const subject = document.getElementById("subject").value;
    const week = document.getElementById("week").value;
    const method = document.getElementById("method").value;

    const goalItem = document.createElement("div");
    goalItem.className = "goal-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `goal-${goalList.children.length + 1}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = `${subject} - ${week} - ${method}`;

    goalItem.appendChild(checkbox);
    goalItem.appendChild(label);
    goalList.appendChild(goalItem);
  });
});
