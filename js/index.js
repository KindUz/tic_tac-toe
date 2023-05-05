const currentPlayerElem = document.getElementById('current');
const gameboardElem = document.querySelector('.gameboard');
const restartButtonElem = document.getElementById('btn_restart');
const playerTextElem = document.getElementById('playerText');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let winner = null;

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerElem.innerHTML = currentPlayer;
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function drawMark(cellIndex) {
  let seconds = 5;
  const cell = document.getElementById(cellIndex);
  cell.innerHTML = currentPlayer;
  cells[cellIndex] = currentPlayer;
  winner = checkWinner();
  if (winner !== null) {
    playerTextElem.innerHTML = `Winner: ${winner}. Touch "Restart"`;
    gameboardElem.removeEventListener('click', handleClick);      
  } else if (!cells.includes('')) {
    playerTextElem.innerHTML = `It's a draw. Game will be reload into 5 seconds`;
    let interval = setInterval(function(){
        gameboardElem.removeEventListener('click', handleClick);
        seconds--;
        playerTextElem.innerHTML = `It's a draw. Game will be reload into ${seconds} seconds`;
        if (seconds === 0) {
            clearInterval(interval);
            restartGame();
        }
    }, 1000)
    
  } else {
    changePlayer();
  }
}

function handleClick(event) {
  const cellIndex = event.target.id;
  if (cells[cellIndex] === '' && winner === null) {
    drawMark(cellIndex);
  }
}

function restartGame() {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  winner = null;
  currentPlayerElem.innerHTML = currentPlayer;
  playerTextElem.innerHTML = 'Tic Tac Toe';
  gameboardElem.addEventListener('click', handleClick);
  document.querySelectorAll('.box').forEach(cell => {
    cell.innerHTML = '';
  });
}

restartButtonElem.addEventListener('click', restartGame);
gameboardElem.addEventListener('click', handleClick);

