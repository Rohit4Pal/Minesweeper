const image = document.createElement("img");
image.src = "/index.jpg";
image.id = "image";
let board = document.getElementById("board");
board.appendChild(image);

document.getElementById("btn").addEventListener("click", startGame);
document.getElementById("reset").addEventListener("click", reset);

let bombPosition = [];
let scoreVal = 0;
let scoreCard = document.getElementById("scoreCard");

function startGame() {
  createBoard();
  generateRandomBombPosition();
}
function createBoard() {
  board.removeChild(image);
  let k = 0;
  for (let i = 0; i < 9; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    board.appendChild(row);
    for (let j = 0; j < 9; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
      cell.id = k++;
      cell.addEventListener("click", handleCellClicked);
    }
  }
}

function handleCellClicked() {
  //only one click per cell is allowed
  if (
    this.style.backgroundColor === "green" ||
    this.style.backgroundColor === "red"
  )
    return;
  let x = bombPosition.indexOf(parseInt(this.id,10));
  console.log(bombPosition);
  //check if this.id exists in bombPosition array or not
  if (x !== -1) {
    //show all the bomb position
    for (let i = 0; i < 9; i++) {
      document.getElementById(bombPosition[i]).style.backgroundColor = "red";
    }
    alert("game Over");
    reset();
  } else {
    scoreCard.innerText = ++scoreVal;
    this.style.backgroundColor = "green";
  }
}

function generateRandomBombPosition() {
  while (bombPosition.length < 9) {
    let r = Math.floor(Math.random() * 80) + 1;
    //push only of it dosen't exists already
    if (bombPosition.indexOf(r) === -1) bombPosition.push(r);
  }
  console.log(bombPosition);
}
function reset() {
  scoreVal = 0;
  scoreCard.innerText = scoreVal;

  //empty bombPosition array
  for (let i = 0; i < 9; i++) bombPosition.pop();

  board.innerHTML = "";
  board.appendChild(image);
}
