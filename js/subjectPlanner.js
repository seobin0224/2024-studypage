// subjectPlanner.js

function loadSubjectPlanner() {
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Subject Planner</h2>
        <div class="mb-4">
            <input type="text" id="subjectName" placeholder="Subject Name" class="p-2 border rounded mr-2">
            <input type="text" id="professorName" placeholder="Professor Name" class="p-2 border rounded mr-2">
            <input type="text" id="semester" placeholder="Semester" class="p-2 border rounded mr-2">
            <button id="addSubject" class="bg-blue-500 text-white p-2 rounded">Add Subject</button>
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
  }
}

function renderSubjects() {
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  const subjectList = document.getElementById("subjectList");
  subjectList.innerHTML = "";

  subjects.forEach((subject) => {
    const subjectElement = document.createElement("div");
    subjectElement.className = "border p-4 rounded";
    subjectElement.innerHTML = `
            <h3 class="text-xl font-semibold">${subject.name}</h3>
            <p>Professor: ${subject.professor}</p>
            <p>Semester: ${subject.semester}</p>
            <button class="addWeeklyPlan bg-green-500 text-white p-2 rounded mt-2" data-subject-id="${subject.id}">Add Weekly Plan</button>
            <div class="weeklyPlans mt-4"></div>
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
    planElement.className = "flex items-center mt-2";
    planElement.innerHTML = `
            <input type="checkbox" ${
              plan.completed ? "checked" : ""
            } class="mr-2 weeklyPlanCheckbox" data-subject-id="${
      subject.id
    }" data-plan-id="${plan.id}">
            <span class="${plan.completed ? "line-through" : ""}">Week ${
      plan.week
    }: ${plan.content}</span>
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
