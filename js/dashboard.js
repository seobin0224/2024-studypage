// dashboard.js

function loadDashboard() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div id="totalSubjects" class="bg-blue-100 p-4 rounded shadow"></div>
            <div id="completedSubjects" class="bg-green-100 p-4 rounded shadow"></div>
            <div id="overallProgress" class="bg-yellow-100 p-4 rounded shadow"></div>
        </div>
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
    }, 0) / (totalSubjects || 1); // Avoid division by zero

  document.getElementById("totalSubjects").innerHTML = `
        <h3 class="font-semibold">Total Subjects</h3>
        <p class="text-3xl font-bold">${totalSubjects}</p>
    `;

  document.getElementById("completedSubjects").innerHTML = `
        <h3 class="font-semibold">Completed Subjects</h3>
        <p class="text-3xl font-bold">${completedSubjects}</p>
    `;

  document.getElementById("overallProgress").innerHTML = `
        <h3 class="font-semibold">Overall Progress</h3>
        <p class="text-3xl font-bold">${overallProgress.toFixed(2)}%</p>
    `;
}

function renderSubjectList() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const subjectList = document.getElementById("subjectList");
  subjectList.innerHTML =
    '<h3 class="text-xl font-semibold mb-2">Subject Progress</h3>';

  subjects.forEach((subject) => {
    const progress = calculateProgress(subject.weeklyPlans);
    const subjectElement = document.createElement("div");
    subjectElement.className = "border p-4 rounded";
    subjectElement.innerHTML = `
            <h4 class="font-semibold">${subject.name}</h4>
            <p>Professor: ${subject.professor}</p>
            <p>Semester: ${subject.semester}</p>
            <p>Progress: ${progress.toFixed(2)}%</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${progress}%"></div>
            </div>
        `;
    subjectList.appendChild(subjectElement);
  });
}

// This function is already defined in utils.js, but we'll keep it here for completeness
function calculateProgress(weeklyPlans) {
  const totalPlans = weeklyPlans.length;
  const completedPlans = weeklyPlans.filter((plan) => plan.completed).length;
  return totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
}
