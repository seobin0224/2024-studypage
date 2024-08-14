// progressTracker.js

function loadProgressTracker() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Progress Tracker</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <canvas id="progressChart"></canvas>
            </div>
            <div id="progressList" class="space-y-4"></div>
        </div>
    `;

  renderProgressChart();
  renderProgressList();
}

function renderProgressChart() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const ctx = document.getElementById("progressChart").getContext("2d");

  const data = subjects.map((subject) => {
    const totalPlans = subject.weeklyPlans.length;
    const completedPlans = subject.weeklyPlans.filter(
      (plan) => plan.completed
    ).length;
    const progress = totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
    return {
      label: subject.name,
      data: [progress],
      backgroundColor: getRandomColor(),
    };
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Progress"],
      datasets: data,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Subject Progress",
        },
      },
    },
  });
}

function renderProgressList() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const progressList = document.getElementById("progressList");
  progressList.innerHTML = "";

  subjects.forEach((subject) => {
    const totalPlans = subject.weeklyPlans.length;
    const completedPlans = subject.weeklyPlans.filter(
      (plan) => plan.completed
    ).length;
    const progress = totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;

    const subjectElement = document.createElement("div");
    subjectElement.className = "border p-4 rounded";
    subjectElement.innerHTML = `
            <h3 class="text-xl font-semibold">${subject.name}</h3>
            <p>Progress: ${progress.toFixed(2)}%</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${progress}%"></div>
            </div>
        `;
    progressList.appendChild(subjectElement);
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
