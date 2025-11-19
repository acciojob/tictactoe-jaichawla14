const submitBtn = document.getElementById("submit");
const inputScreen = document.getElementById("input-screen");
const gameScreen = document.getElementById("game-screen");
const msg = document.querySelector(".message");
const boardDiv = document.querySelector(".board");


let p1 = "", p2 = "";
let turn = "X";
let currentPlayer = "";
let cells = [];


const winPatterns = [
[0,1,2], [3,4,5], [6,7,8],
[0,3,6], [1,4,7], [2,5,8],
[0,4,8], [2,4,6]
];


submitBtn.addEventListener("click", () => {
p1 = document.getElementById("player-1").value.trim();
p2 = document.getElementById("player-2").value.trim();
if (!p1 || !p2) return alert("Enter both names");


inputScreen.style.display = "none";
gameScreen.style.display = "block";


currentPlayer = p1;
msg.textContent = `${currentPlayer}, you're up`;


createBoard();
});


function createBoard() {
boardDiv.innerHTML = "";
cells = [];


for (let i = 0; i < 9; i++) {
const cell = document.createElement("div");
cell.classList.add("cell");
cell.id = i + 1;


cell.addEventListener("click", () => handleMove(cell), { once: true });


boardDiv.appendChild(cell);
cells.push(cell);
}
}


function handleMove(cell) {
cell.textContent = turn;


if (checkWinner()) return;


turn = turn === "X" ? "O" : "X";
currentPlayer = turn === "X" ? p1 : p2;


msg.textContent = `${currentPlayer}, you're up`;
}


function checkWinner() {
for (let pattern of winPatterns) {
const [a, b, c] = pattern;
if (
cells[a].textContent &&
cells[a].textContent === cells[b].textContent &&
cells[b].textContent === cells[c].textContent
) {
cells[a].classList.add("win");
cells[b].classList.add("win");
cells[c].classList.add("win");


msg.textContent = `${currentPlayer}, congratulations you won!`;


cells.forEach(cell => cell.style.pointerEvents = "none");
return true;
}
}
return false;
}
