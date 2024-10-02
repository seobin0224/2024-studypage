// progressTracker.js

function loadProgressTracker() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <h2 class="text-3xl font-bold mb-6">Progress Tracker</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <canvas id="subjectProgressChart"></canvas>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <canvas id="weeklyStudyTimeChart"></canvas>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <canvas id="completionRateChart"></canvas>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <table id="overallProgressTable" class="w-full">
          <thead>
            <tr>
              <th class="text-left">Subject</th>
              <th class="text-left">Progress</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  `;

  renderSubjectProgressChart();
  renderWeeklyStudyTimeChart();
  renderCompletionRateChart();
  renderOverallProgressTable();
}

function renderSubjectProgressChart() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const ctx = document.getElementById("subjectProgressChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: subjects.map((subject) => subject.name),
      datasets: [
        {
          label: "Progress (%)",
          data: subjects.map((subject) =>
            calculateProgress(subject.weeklyPlans)
          ),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Subject Progress",
        },
      },
    },
  });
}

function renderWeeklyStudyTimeChart() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const weeklyData = Array(7).fill(0); // 7주치 데이터 초기화

  subjects.forEach((subject) => {
    subject.weeklyPlans.forEach((plan, index) => {
      if (plan.completed && index < 7) {
        // 완료된 계획만 카운트
        weeklyData[index] += 1; // 각 주에 1시간씩 추가 (또는 실제 학습 시간으로 조정)
      }
    });
  });

  const ctx = document.getElementById("weeklyStudyTimeChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
      ],
      datasets: [
        {
          label: "Study Amount",
          data: weeklyData,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Weekly Study Time",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Completed Plans",
          },
        },
      },
    },
  });
}

function renderCompletionRateChart() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const completedTasks = subjects.reduce(
    (sum, subject) =>
      sum + subject.weeklyPlans.filter((plan) => plan.completed).length,
    0
  );
  const totalTasks = subjects.reduce(
    (sum, subject) => sum + subject.weeklyPlans.length,
    0
  );

  const ctx = document.getElementById("completionRateChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [completedTasks, totalTasks - completedTasks],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Overall Completion Rate",
        },
      },
    },
  });
}

function renderOverallProgressTable() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const tableBody = document.querySelector("#overallProgressTable tbody");

  subjects.forEach((subject) => {
    const progress = calculateProgress(subject.weeklyPlans);
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${subject.name}</td>
      <td>${progress.toFixed(2)}%</td>
      <td>${getProgressStatus(progress)}</td>
    `;
  });
}

function getProgressStatus(progress) {
  if (progress >= 80) return "Excellent";
  if (progress >= 60) return "Good";
  if (progress >= 40) return "Fair";
  return "Needs Improvement";
}
