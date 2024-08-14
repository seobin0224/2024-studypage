// progressTracker.js

function loadProgressTracker() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
      <h2 class="text-3xl font-bold mb-6">Progress Tracker</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
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
    const progress = calculateProgress(subject.weeklyPlans);
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
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: "Progress (%)",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Subject Progress",
          font: {
            size: 18,
          },
        },
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

function renderProgressList() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const progressList = document.getElementById("progressList");
  progressList.innerHTML =
    '<h3 class="text-xl font-semibold mb-4">Detailed Progress</h3>';

  subjects.forEach((subject) => {
    const progress = calculateProgress(subject.weeklyPlans);

    const subjectElement = document.createElement("div");
    subjectElement.className = "bg-white p-4 rounded-lg shadow-md";
    subjectElement.innerHTML = `
          <h4 class="text-lg font-semibold mb-2">${subject.name}</h4>
          <p class="text-text-secondary mb-2">Professor: ${
            subject.professor
          }</p>
          <p class="text-text-secondary mb-2">Semester: ${subject.semester}</p>
          <p class="font-semibold">Progress: ${progress.toFixed(2)}%</p>
          <div class="w-full bg-secondary rounded-full h-2.5 mt-2">
              <div class="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" style="width: ${progress}%"></div>
          </div>
      `;
    progressList.appendChild(subjectElement);
  });
}

function calculateProgress(weeklyPlans) {
  const totalPlans = weeklyPlans.length;
  const completedPlans = weeklyPlans.filter((plan) => plan.completed).length;
  return totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
