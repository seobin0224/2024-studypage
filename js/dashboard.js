// dashboard.js

function loadDashboard() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
      <h2 class="text-3xl font-bold mb-6">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div id="totalSubjects" class="bg-white p-6 rounded-lg shadow-md"></div>
          <div id="completedSubjects" class="bg-white p-6 rounded-lg shadow-md"></div>
          <div id="overallProgress" class="bg-white p-6 rounded-lg shadow-md"></div>
      </div>
      <h3 class="text-2xl font-semibold mb-4">Subject Progress</h3>
      <div id="subjectList" class="space-y-4"></div>
  `;

  updateDashboardStats();
  renderSubjectList();
}

function updateDashboardStats() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const totalSubjects = subjects.length;
  const completedSubjects = subjects.filter(
    (subject) =>
      subject.weeklyPlans.length > 0 &&
      subject.weeklyPlans.every((plan) => plan.completed)
  ).length;

  const overallProgress =
    subjects.reduce((sum, subject) => {
      return sum + calculateProgress(subject.weeklyPlans);
    }, 0) / (totalSubjects || 1);

  document.getElementById("totalSubjects").innerHTML = `
      <h3 class="text-xl font-semibold mb-2">Total Subjects</h3>
      <p class="text-4xl font-bold text-primary">${totalSubjects}</p>
  `;

  document.getElementById("completedSubjects").innerHTML = `
      <h3 class="text-xl font-semibold mb-2">Completed Subjects</h3>
      <p class="text-4xl font-bold text-accent-green">${completedSubjects}</p>
  `;

  document.getElementById("overallProgress").innerHTML = `
      <h3 class="text-xl font-semibold mb-2">Overall Progress</h3>
      <p class="text-4xl font-bold text-accent-orange">${overallProgress.toFixed(
        2
      )}%</p>
  `;
}

function renderSubjectList() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const subjectList = document.getElementById("subjectList");
  subjectList.innerHTML = "";

  subjects.forEach((subject) => {
    const progress = calculateProgress(subject.weeklyPlans);
    const subjectElement = document.createElement("div");
    subjectElement.className =
      "bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg";
    subjectElement.innerHTML = `
          <h4 class="text-xl font-semibold mb-2">${subject.name}</h4>
          <p class="text-text-secondary">Professor: ${subject.professor}</p>
          <p class="text-text-secondary mb-2">Semester: ${subject.semester}</p>
          <p class="font-semibold">Progress: ${progress.toFixed(2)}%</p>
          <div class="w-full bg-secondary rounded-full h-2.5 mt-2">
              <div class="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" style="width: ${progress}%"></div>
          </div>
      `;
    subjectList.appendChild(subjectElement);
  });
}

function calculateProgress(weeklyPlans) {
  const totalPlans = weeklyPlans.length;
  const completedPlans = weeklyPlans.filter((plan) => plan.completed).length;
  return totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
}
