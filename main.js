const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const diceNew = document.querySelector(".btn--new");
const diceRoll = document.querySelector(".btn--roll");
const diceHold = document.querySelector(".btn--hold");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
score0.textContent = 0;
score1.textContent = 0;
diceElement.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

const initial = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  diceElement.classList.add("hidden");
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--active");

  document.querySelector(".player--0").classList.add("player--active");
};
initial();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

diceRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

diceHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceElement.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

diceNew.addEventListener("click", function () {
  initial();
});
