const cells = document.querySelectorAll(".cell");
const PLAYER_X = "X";
const PLAYER_O = "O";

let turns = PLAYER_X;

let boardState = Array(cells.length);
boardState.fill(null);

//elements
const strike = document.getElementById("strike");
const winningArea = document.getElementById("winning-message");
let winnerText = document.getElementById("who-won-the-game-text");
const btn = document.getElementById("restart-btn");
btn.addEventListener("click", resetGame);

// sounds

const finalSound = new Audio("sounds/winner-sound.mp3");
const clickSound = new Audio("sounds/iphone-camera-capture-6448.mp3");

cells.forEach((c) => c.addEventListener("click", cellClick));

function setHoverText() {
  //remove all hover text
  cells.forEach((c) => {
    c.classList.remove("x-hover");
    c.classList.remove("o-hover");
  });
  const hoverClass = `${turns.toLowerCase()}-hover`;
  cells.forEach((c) => {
    if (c.innerText == "") {
      c.classList.add(hoverClass);
    }
  });
}
setHoverText();

function cellClick(e) {
  if (winningArea.classList.contains("visible")) {
    return;
  }
  const cell = e.target;
  const cellNumber = cell.dataset.index;
  if (cell.innerText != "") {
    return;
  }
  if (turns === PLAYER_X) {
    cell.innerText = PLAYER_X;
    boardState[cellNumber - 1] = PLAYER_X;
    turns = PLAYER_O;
  } else {
    cell.innerText = PLAYER_O;
    boardState[cellNumber - 1] = PLAYER_O;
    turns = PLAYER_X;
  }
  clickSound.play();
  setHoverText();
  checkWinner();
  // finalSound.play()
}
function checkWinner() {
  for (const combination of winningCombos) {
    const { combo, strikeClass } = combination;
    const cellValue1 = boardState[combo[0] - 1];
    const cellValue2 = boardState[combo[1] - 1];
    const cellValue3 = boardState[combo[2] - 1];
    if (
      cellValue1 != null &&
      cellValue1 === cellValue2 &&
      cellValue1 === cellValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(cellValue1);
      return;
    }
  }
  const allCellFilledIn = boardState.every((cell) => cell != null);
  if (allCellFilledIn) {
    gameOverScreen(null);
  }
}
function gameOverScreen(winnerInformation) {
  let text = "Draw!";
  if (winnerInformation != null) {
    text = `Winner is ${winnerInformation}!`;
  }
  winningArea.className = "visible";
  winnerText.innerText = text;
  finalSound.play();
}

const winningCombos = [
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },

  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },

  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

function resetGame() {
  cells.forEach((c) => {
    c.innerText = "";
  });
  boardState.fill(null);
  turns = PLAYER_X;
  strike.className = "strike";
  winningArea.className = "hidden";
  setHoverText()
}
