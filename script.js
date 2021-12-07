// Notes:
// !!! reference code
// # to indicte for basic and base exercises
// ### to indicate for Comfortable exercise
// ##### to indicate for Comfortable exercise

// ===================================================
//  Global Variables
// ===================================================

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
let currentPlayer = 'X';

// !!! create a gameInfo board
const gameInfo = document.createElement('div');
// # give a class for CSS purpose
gameInfo.classList.add('messages');
document.body.appendChild(gameInfo);

// ===================================================
//  Helper Functions
// ===================================================

// # create a helper function for output to abstract complexity
// # of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// ===================================================
//  Gameplay Logic
// ===================================================

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// create click checkWin function
const checkWin = (board) => {
  // hardcode to write all the 15 conditions
  // need to ensure the first element is not " " else will default return true

  // check every position
  // there is a conditional for all 15 win conditions
  // #1 (0,0) series - coordinates (0,0), (0,1), (0,2)
  if (
    board[0][0] !== '' &&
    board[0][0] === board[0][1] &&
    board[0][1] === board[0][2]
  ) {
    return true;
  }
  // coordinates (0,0), (1,1), (2,2)
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }
  // coordinates (0,0), (1,0), (2,0)
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0]
  ) {
    return true;
  }
  // #2 (0,1) series - coordinates (0,1), (1,1), (2,2)
  if (
    board[0][1] !== '' &&
    board[0][1] === board[1][1] &&
    board[0][1] === board[2][1]
  ) {
    return true;
  }
  // #3 (0,2) series - coordinates (0,2), (0,1), (0,1)
  if (
    board[0][2] !== '' &&
    board[0][2] === board[0][1] &&
    board[0][1] === board[0][0]
  ) {
    return true;
  }
  // coordinates (0,2), (1,2), (2,2)
  if (
    board[0][2] !== '' &&
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2]
  ) {
    return true;
  }
  // coordinates (0,2), (1,1), (2,2)
  if (
    board[0][2] !== '' &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }
  // #4 (1,0) coordinates (1,0), (1,1), (1,2)
  if (
    board[1][0] !== '' &&
    board[1][0] === board[1][1] &&
    board[1][1] === board[1][2]
  ) {
    return true;
  }
  // #5 (1,1) series coordinates (0,1), (1,1), (2,1)
  if (
    board[0][1] !== '' &&
    board[0][1] === board[1][1] &&
    board[1][1] === board[2][1]
  ) {
    return true;
  }
  // #6 (2,0) series coordinates (0,0), (1,0), (2,0)
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0]
  ) {
    return true;
  }
  //  coordinates (2,0), (2,1), (2,2)
  if (
    board[2][0] !== '' &&
    board[2][0] === board[2][1] &&
    board[2][1] === board[2][2]
  ) {
    return true;
  }
  //  coordinates (2,0), (1,1), (0,2)
  if (
    board[2][0] !== '' &&
    board[2][0] === board[1][1] &&
    board[1][1] === board[0][2]
  ) {
    return true;
  }
  // #7 (2,1) series
  // coordinates (2,1), (1,1), (0,1)
  if (
    board[2][1] !== '' &&
    board[2][1] === board[1][1] &&
    board[1][1] === board[0][1]
  ) {
    return true;
  }
  // #8 (2,2)
  // series coordinates (2,2), (1,1), (0,0)
  if (
    board[2][2] !== '' &&
    board[2][2] === board[1][1] &&
    board[1][1] === board[0][0]
  ) {
    return true;
  }
  // coordinates (2,2), (0,2), (1,2)
  if (
    board[2][2] !== '' &&
    board[2][2] === board[1][2] &&
    board[1][2] === board[0][2]
  ) {
    return true;
  }
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);
  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    console.log(currentPlayer);
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // check winner
    checkWin(board);

    // // change the player
    // togglePlayer();

    // console.log('test!!');
    // console.log(roundWon);
    if (checkWin(board) === true) {
      console.log('finally win!');
      output(`Game over! ${currentPlayer} wins!`);
    } else {
      togglePlayer();
    }
  }
};

// ===================================================
//  Game Initialisation Logic
// ===================================================

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard(board);
  output('Please click the square to make your turn');
};

// initiate the game
initGame();
