'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker(color) {
  // Your code here
  if(color === 'white') {
    this.symbol = String.fromCharCode(0x125CB);
  } else {
    this.symbol = String.fromCharCode(0x125CF);
  }
}

class Board {
  constructor() {
    this.grid = []

    //SPEC 2.1 - In your Board class, create an attribute called this.checkers and assign it to an empty array. 
    this.checkers = []

  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }
  //Now create a method called this.createCheckers. In it, let's define our starting positions of the checkers on the grid.

  createCheckers() {

    //In it, let's define our starting positions of the checkers on the grid. In local variables, define whitePositions and blackPositions as array of [row, column] coordinates:

    let whitePositions = [[0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]];

    let blackPositions = [[5, 0], [5, 2], [5, 4], [5, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [7, 0], [7, 2], [7, 4], [7, 6]]

    //In a for loop, iterate over the range from 0 - 11, with each index you want to:
    for(let i = 0 ; i < 12 ; i++) {
      //Instantiate a 'white' Checker
      let checkerPiece = new Checker('white');
      // Place that checker on the grid at the position corresponding with the index in the positions array
      //i = [0,1]
      let placeRow = whitePositions[i][0];
      let placeCol = whitePositions[i][1];
      this.grid[placeRow][placeCol] = checkerPiece;

      // Push the checker into your this.checkers array
      this.checkers.push(checkerPiece);
      // Do all three steps above for a 'black' checker
    };
    for(let j = 0 ; j < 12 ; j++) {
      //Instantiate a 'white' Checker
      let checkerPiece = new Checker('black');
      // Place that checker on the grid at the position corresponding with the index in the positions array
      //i = [0,1]
      let placeRow = blackPositions[j][0];
      let placeCol = blackPositions[j][1];
      this.grid[placeRow][placeCol] = checkerPiece;

      // Push the checker into your this.checkers array
      this.checkers.push(checkerPiece);
      // Do all three steps above for a 'black' checker
    };
  }
}

  // In a for loop, iterate over the range from 0 - 11, with each index you want to:





class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
