// subjectPlanner.js

function loadSubjectPlanner() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
      <h2 class="text-3xl font-bold mb-6">Subject Planner</h2>
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 class="text-xl font-semibold mb-4">Add New Subject</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" id="subjectName" placeholder="Subject Name" class="w-full p-2 border border-gray-300 rounded">
              <input type="text" id="professorName" placeholder="Professor Name" class="w-full p-2 border border-gray-300 rounded">
              <input type="text" id="semester" placeholder="Semester" class="w-full p-2 border border-gray-300 rounded">
          </div>
          <button id="addSubject" class="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Add Subject</button>
      </div>
      <div id="subjectList" class="space-y-4"></div>
  `;

  document.getElementById("addSubject").addEventListener("click", addSubject);
  renderSubjects();
}

function addSubject() {
  const subjectName = document.getElementById("subjectName").value;
  const professorName = document.getElementById("professorName").value;
  const semester = document.getElementById("semester").value;

  if (subjectName && professorName && semester) {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.push({
      id: Date.now(),
      name: subjectName,
      professor: professorName,
      semester: semester,
      weeklyPlans: [],
    });
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjects();
    clearInputs();
  } else {
    alert("Please fill in all fields");
  }
}

function renderSubjects() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const subjectList = document.getElementById("subjectList");
  subjectList.innerHTML = "";

  subjects.forEach((subject) => {
    const subjectElement = document.createElement("div");
    subjectElement.className = "bg-white p-6 rounded-lg shadow-md";
    subjectElement.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${subject.name}</h3>
          <p class="text-text-secondary">Professor: ${subject.professor}</p>
          <p class="text-text-secondary mb-4">Semester: ${subject.semester}</p>
          <button class="addWeeklyPlan bg-accent-green text-white px-4 py-2 rounded hover:bg-green-600 transition-colors" data-subject-id="${subject.id}">Add Weekly Plan</button>
          <div class="weeklyPlans mt-4 space-y-2"></div>
      `;
    subjectList.appendChild(subjectElement);

    const addWeeklyPlanButton = subjectElement.querySelector(".addWeeklyPlan");
    addWeeklyPlanButton.addEventListener("click", () =>
      addWeeklyPlan(subject.id)
    );

    renderWeeklyPlans(subject, subjectElement.querySelector(".weeklyPlans"));
  });
}

function addWeeklyPlan(subjectId) {
  const subjects = JSON.parse(localStorage.getItem("subjects"));
  const subject = subjects.find((s) => s.id === subjectId);

  const weekNumber = subject.weeklyPlans.length + 1;
  const newPlan = {
    id: Date.now(),
    week: weekNumber,
    content: `Week ${weekNumber} content`,
    completed: false,
  };

  subject.weeklyPlans.push(newPlan);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  renderSubjects();
}

function renderWeeklyPlans(subject, container) {
  container.innerHTML = "";
  subject.weeklyPlans.forEach((plan) => {
    const planElement = document.createElement("div");
    planElement.className = "flex items-center bg-secondary p-2 rounded";
    planElement.innerHTML = `
          <input type="checkbox" ${
            plan.completed ? "checked" : ""
          } class="mr-2 weeklyPlanCheckbox" data-subject-id="${
      subject.id
    }" data-plan-id="${plan.id}">
          <span class="${
            plan.completed ? "line-through text-text-secondary" : ""
          }">Week ${plan.week}: ${plan.content}</span>
      `;
    container.appendChild(planElement);

    const checkbox = planElement.querySelector(".weeklyPlanCheckbox");
    checkbox.addEventListener("change", (e) =>
      toggleWeeklyPlan(subject.id, plan.id, e.target.checked)
    );
  });
}

function toggleWeeklyPlan(subjectId, planId, completed) {
  const subjects = JSON.parse(localStorage.getItem("subjects"));
  const subject = subjects.find((s) => s.id === subjectId);
  const plan = subject.weeklyPlans.find((p) => p.id === planId);
  plan.completed = completed;
  localStorage.setItem("subjects", JSON.stringify(subjects));
  renderSubjects();
}

function clearInputs() {
  document.getElementById("subjectName").value = "";
  document.getElementById("professorName").value = "";
  document.getElementById("semester").value = "";
}
