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

// set an initial mode to allow user to click the square
let canClick = true;

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

// create a resetBoard function to reset the whole game when game is over

const resetBoard = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
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

// create chekcWinForALL function to check for all possible cases
// 1.create two nested loops through the board
// 2.create loop to move through vertically, horizontally, diagonally left to right and
// diagonally right to left.
// 3. imagine the board element indexes create coordinates

const checkWin = (board) => {
  // create 4 winning functions to check for Row, Column and DiagonalUp and DiagonalDown
  // declare individual winning conditions
  // check for horizontal rows
  const checkWinForRows = (board) => {
    console.log('checkWinForRows ');
    for (let row = 0; row < board.length; row += 1) {
      let counter = 0;
      for (let column = 0; column < board.length; column += 1) {
        if (board[row][column] !== '' && board[row][column] === currentPlayer) {
          counter += 1;
          console.log(counter);
        }
      }
      if (counter === 3) {
        return true;
      }
    }
  };

  // check for vertical columns
  const checkWinForColumns = (board) => {
    console.log('checkWinForColumns ');
    for (let column = 0; column < board.length; column += 1) {
      let counter = 0;
      for (let row = 0; row < board.length; row += 1) {
        if (board[row][column] !== '' && board[row][column] === currentPlayer) {
          counter += 1;
          console.log(counter);
        }
      }
      if (counter === 3) {
        return true;
      }
    }
  };

  // check for diagonal down
  const checkWinForDiagonalsDown = (board) => {
    console.log('checkWinForDiagonalsDown');
    let counter = 0;
    for (let row = 0; row < board.length; row += 1) {
      if (board[row][row] !== '' && board[row][row] === currentPlayer) {
        counter += 1;
        console.log(counter);
      }
      if (counter === 3) {
        return true;
      }
    }
  };

  // check for diagonal up
  const checkWinForDiagonalsUp = (board) => {
    console.log('checkWinForDiagonalsUp');
    let count = board.length - 1;
    let counter = 0;
    for (let row = board.length - 1; row >= 0; row -= 1) {
      if (
        board[row][Math.abs(row - count)] !== '' &&
        board[row][Math.abs(row - count)] === currentPlayer
      ) {
        console.log(row);
        console.log(Math.abs(row - count));
        counter += 1;
        console.log(counter);
      }

      if (counter === 3) {
        return true;
      }
    }
  };

  // // call the winning functions
  // checkWinForRows(board);
  // checkWinForColumns(board);
  // checkWinForDiagonalsDown(board);
  // // checkWinForDiagonalsUp(board);

  // set the condition to return true if any of the above function returns true
  if (
    checkWinForRows(board) === true ||
    checkWinForColumns(board) === true ||
    checkWinForDiagonalsDown(board) === true ||
    checkWinForDiagonalsUp(board) === true
  ) {
    return true;
  } else {
    false;
  }
};

// // create click checkWin function
// const checkWin = (board) => {
//   // hardcode to write all the 15 conditions
//   // need to ensure the first element is not " " else will default return true

//   // check every position
//   // there is a conditional for all 15 win conditions
//   // #1 (0,0) series - coordinates (0,0), (0,1), (0,2)
//   if (
//     board[0][0] !== '' &&
//     board[0][0] === board[0][1] &&
//     board[0][1] === board[0][2]
//   ) {
//     return true;
//   }
//   // coordinates (0,0), (1,1), (2,2)
//   if (
//     board[0][0] !== '' &&
//     board[0][0] === board[1][1] &&
//     board[1][1] === board[2][2]
//   ) {
//     return true;
//   }
//   // coordinates (0,0), (1,0), (2,0)
//   if (
//     board[0][0] !== '' &&
//     board[0][0] === board[1][0] &&
//     board[1][0] === board[2][0]
//   ) {
//     return true;
//   }
//   // #2 (0,1) series - coordinates (0,1), (1,1), (2,2)
//   if (
//     board[0][1] !== '' &&
//     board[0][1] === board[1][1] &&
//     board[0][1] === board[2][1]
//   ) {
//     return true;
//   }
//   // #3 (0,2) series - coordinates (0,2), (0,1), (0,1)
//   if (
//     board[0][2] !== '' &&
//     board[0][2] === board[0][1] &&
//     board[0][1] === board[0][0]
//   ) {
//     return true;
//   }
//   // coordinates (0,2), (1,2), (2,2)
//   if (
//     board[0][2] !== '' &&
//     board[0][2] === board[1][2] &&
//     board[1][2] === board[2][2]
//   ) {
//     return true;
//   }
//   // coordinates (0,2), (1,1), (2,2)
//   if (
//     board[0][2] !== '' &&
//     board[0][2] === board[1][1] &&
//     board[1][1] === board[2][0]
//   ) {
//     return true;
//   }
//   // #4 (1,0) coordinates (1,0), (1,1), (1,2)
//   if (
//     board[1][0] !== '' &&
//     board[1][0] === board[1][1] &&
//     board[1][1] === board[1][2]
//   ) {
//     return true;
//   }
//   // #5 (1,1) series coordinates (0,1), (1,1), (2,1)
//   if (
//     board[0][1] !== '' &&
//     board[0][1] === board[1][1] &&
//     board[1][1] === board[2][1]
//   ) {
//     return true;
//   }
//   // #6 (2,0) series coordinates (0,0), (1,0), (2,0)
//   if (
//     board[0][0] !== '' &&
//     board[0][0] === board[1][0] &&
//     board[1][0] === board[2][0]
//   ) {
//     return true;
//   }
//   //  coordinates (2,0), (2,1), (2,2)
//   if (
//     board[2][0] !== '' &&
//     board[2][0] === board[2][1] &&
//     board[2][1] === board[2][2]
//   ) {
//     return true;
//   }
//   //  coordinates (2,0), (1,1), (0,2)
//   if (
//     board[2][0] !== '' &&
//     board[2][0] === board[1][1] &&
//     board[1][1] === board[0][2]
//   ) {
//     return true;
//   }
//   // #7 (2,1) series
//   // coordinates (2,1), (1,1), (0,1)
//   if (
//     board[2][1] !== '' &&
//     board[2][1] === board[1][1] &&
//     board[1][1] === board[0][1]
//   ) {
//     return true;
//   }
//   // #8 (2,2)
//   // series coordinates (2,2), (1,1), (0,0)
//   if (
//     board[2][2] !== '' &&
//     board[2][2] === board[1][1] &&
//     board[1][1] === board[0][0]
//   ) {
//     return true;
//   }
//   // coordinates (2,2), (0,2), (1,2)
//   if (
//     board[2][2] !== '' &&
//     board[2][2] === board[1][2] &&
//     board[1][2] === board[0][2]
//   ) {
//     return true;
//   }
// };

const squareClick = (row, column) => {
  console.log('coordinates', row, column);
  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    console.log(currentPlayer);
    // refresh the creen with a new board
    // according to the array that was just changed

    // check the canClick condition first
    if (canClick === true) {
      buildBoard(board);
      // check winner
      checkWin(board);

      if (checkWin(board) === true) {
        console.log('finally win!');
        output(`Game over! ${currentPlayer} wins!`);
        canClick = false;
        // reset the board when game is over!
        resetBoard();
        // build the board again
        buildBoard(board);
      } else {
        togglePlayer();
      }
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
  output('Click the square to make your turn');
};

// initiate the game
initGame();
