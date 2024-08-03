document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("home-link");
  const setGoalsLink = document.getElementById("set-goals-link");
  const settingsLink = document.getElementById("settings-link");
  const contactLink = document.getElementById("contact-link");
  const profileLink = document.getElementById("profile-link");
  const logoutLink = document.getElementById("logout-link");
  const goalList = document.getElementById("goal-list");
  const setGoalButton = document.getElementById("set-goal");

  if (homeLink) {
    homeLink.addEventListener("click", () => {
      window.location.href = "/";
    });
  }

  if (setGoalsLink) {
    setGoalsLink.addEventListener("click", () => {
      window.location.href = "/studygoal";
    });
  }

  if (settingsLink) {
    settingsLink.addEventListener("click", () => {
      alert("Settings section is under construction.");
    });
  }

  if (contactLink) {
    contactLink.addEventListener("click", () => {
      alert("Contact section is under construction.");
    });
  }

  if (profileLink) {
    profileLink.addEventListener("click", () => {
      alert("Profile section is under construction.");
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      alert("Login functionality is under construction.");
    });
  }

  if (setGoalButton) {
    setGoalButton.addEventListener("click", () => {
      const subject = document.getElementById("subject").value;
      const week = document.getElementById("week").value;
      const method = document.getElementById("method").value;

      if (subject === "" || week === "" || method === "") {
        alert("Please fill in all fields.");
        return;
      }

      const goalItem = document.createElement("li");
      goalItem.className = "goal-item";

      const goalText = document.createElement("span");
      goalText.textContent = `${subject} - ${week} - ${method}`;

      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.className = "complete-goal";
      completeButton.addEventListener("click", () => {
        goalText.style.textDecoration = "line-through";
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-goal";
      deleteButton.addEventListener("click", () => {
        goalList.removeChild(goalItem);
      });

      goalItem.appendChild(goalText);
      goalItem.appendChild(completeButton);
      goalItem.appendChild(deleteButton);
      goalList.appendChild(goalItem);

      // Clear the form fields after adding the goal
      document.getElementById("goal-form").reset();
    });
  }
});
