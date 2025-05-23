console.log("quiz.js loaded");
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!isLoggedIn) {
    alert("You must be logged in to access the quiz.");
    window.location.href = "../Html/login.html";
  }

  function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return decodeURIComponent(params.get("category"));
  }

  const category = getCategoryFromURL();
  if (!category) {
    alert("Category missing from URL");
    window.location.href = "../Html/index.html";
  }

  const socket = io();
  const username = prompt("Enter your name");
  socket.emit("join", { username, category });

  let questions = [];
  let current = 0;
  let totalTime = 1800;
  let timer;
  let localScore = 0;

  const timerEl = document.createElement("div");
  timerEl.id = "timer";
  timerEl.style.fontWeight = "bold";
  timerEl.style.fontSize = "18px";
  timerEl.style.marginBottom = "10px";
  document.body.prepend(timerEl);

  socket.on("quizData", (data) => {
    questions = data.questions;
    totalTime = data.duration;
    startTimer();
    showQuestion();
  });

  function showQuestion() {
    if (current >= questions.length) {
      endQuiz();
      return;
    }
    const q = questions[current];
    document.getElementById("quizContainer").innerHTML = `
    <h2>Q${current + 1}: ${q.question}</h2>
    ${q.options
      .map(
        (opt) =>
          `<button onclick="submit('${opt}', '${q.answer}')">${opt}</button>`
      )
      .join("")}
    `;
  }

  window.submit = function (selected, correct) {
    if (selected === correct) {
      localScore += 1;
    }
    socket.emit("submitAnswer", { index: current, selected, correct });
    current++;
    showQuestion();
  };

  function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
      if (totalTime <= 0 || current >= questions.length) {
        clearInterval(timer);
        endQuiz();
      } else {
        totalTime--;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = String(Math.floor(totalTime / 60)).padStart(2, "0");
    const seconds = String(totalTime % 60).padStart(2, "0");
    timerEl.innerText = `⏱️ Time Left: ${minutes}:${seconds}`;
  }

  function endQuiz() {
    clearInterval(timer);
    document.getElementById("quizContainer").innerHTML = `
      <h2>Quiz Over!</h2>
      <p>Your Final Score: <strong>${localScore} / ${questions.length}</strong></p>
    `;
  }
});