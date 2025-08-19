const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function countDown() {
  state.values.currentTime--; 
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    gameOver();
  }
}

function playSound(audioName) {
  const audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.05;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  const randomNumber = Math.floor(Math.random() * 9);
  const randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("pointerdown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function startGame() {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function gameOver() {
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
  document.getElementById("finalScore").textContent = state.values.result;
  const modal = document.getElementById("gameOverModal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function resetGame() {
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimerId);
  state.values.result = 0;
  state.values.currentTime = 60;
  state.view.score.textContent = 0;
  state.view.timeLeft.textContent = 60;
  const modal = document.getElementById("gameOverModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  startGame();
}

function initialize() {
  addListenerHitBox();
  startGame();
  document.getElementById("restartBtn").addEventListener("click", resetGame);
}

initialize();
