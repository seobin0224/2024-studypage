// utils.js

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function calculateProgress(weeklyPlans) {
  const totalPlans = weeklyPlans.length;
  const completedPlans = weeklyPlans.filter((plan) => plan.completed).length;
  return totalPlans > 0 ? (completedPlans / totalPlans) * 100 : 0;
}

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}
