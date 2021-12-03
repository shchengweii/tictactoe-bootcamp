// Notes:
// !!! reference from peers'code
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

// ===================================================
//  Helper Functions
// ===================================================

// # create a helper function for output to abstract complexity
// # of DOM manipulation away from game logic
// const output = (message) => {
//   gameInfo.innerText = message;
// };

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // # create a container for gameInfo
  const gameInfo = document.createElement('div');
  // # give a class for CSS purpose
  gameInfo.classList.add('gameInfo');
  gameInfo.innerText = 'Please click the square to make your turn';
  boardContainer.appendChild(gameInfo);

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
        squareClick(gameInfo, i, j);
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

// // create squareClick function
// const squareClick = (row, column) => {
//   console.log('coordinates', row, column);

//   // see if the clicked square has been clicked on before
//   if (board[row][column] === '') {
//     // alter the data array, set it to the current player
//     board[row][column] = currentPlayer;
//     console.log(currentPlayer);

//     // refresh the creen with a new board
//     // according to the array that was just changed
//     buildBoard(board);

//     // change the player
//     togglePlayer();
//   }
// };

// create click checkWin function
const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  // #1 (0,0) series - coordinates (0,0), (0,1), (0,2)
  if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    return;
  }

  // coordinates (0,0), (1,1), (2,2)
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return;
  }

  // coordinates (0,0), (1,0), (2,0)
  if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    // X
    // X
    // X
    return;
  }
  // #2 (0,1) series - coordinates (0,1), (1,1), (2,2)
  if (board[0][1] === board[1][1] && board[0][1] === board[2][1]) {
    return;
  }
  // #3 (0,2) series - coordinates (0,2), (0,1), (0,1)
  if (board[0][2] === board[0][1] && board[0][1] === board[0][0]) {
    return;
  }

  // coordinates (0,2), (1,2), (2,2)
  if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
    return;
  }

  // coordinates (0,2), (1,1), (2,2)
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return;
  }

  // #4 (1,0) coordinates (1,0), (1,1), (1,2)
  if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    return;
  }

  // #5 (1,1) series coordinates (0,1), (1,1), (2,1)
  if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    return;
  }

  // #6 (2,0) series coordinates (0,0), (1,0), (2,0)
  if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    return;
  }

  //  coordinates (2,0), (2,1), (2,2)
  if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
    return;
  }

  //  coordinates (2,0), (1,1), (0,2)
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
    return;
  }

  // #7 (2,1) series
  // coordinates (2,1), (1,1), (0,1)
  if (board[2][1] === board[1][1] && board[1][1] === board[0][1]) {
    return;
  }

  // #8 (2,2)
  // series coordinates (2,2), (1,1), (0,0)
  if (board[2][2] === board[1][1] && board[1][1] === board[0][0]) {
    return;
  }

  // coordinates (2,2), (0,2), (1,2)
  if (board[2][2] === board[1][2] && board[1][2] === board[0][2]) {
    return;
  }
};

const squareClick = (gameInfo, row, column) => {
  console.log('coordinates', row, column);

  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    console.log(currentPlayer);
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    console.log(board);

    // to add in the input when calling checkWin function
    if (checkWin(board) === true) {
      console.log('win liao!');
      gameInfo.innerText = 'Game Over!!';
      console.log(gameInfo);
      // game over
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
};

// initiate the game

initGame();
