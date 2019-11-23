'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isWhite = (checker) => {
  return checker.symbol === String.fromCharCode(0x125CB);
}

function difference(a, b) {
  return Math.abs(a - b);
}

const legalRow = (checker, startRow, endRow) => {
  //if checker is white, moves to positive row
  //if checker is black, moves to negative row
  //white
  if(isWhite(checker)) {
    return startRow > endRow;
  } else {
    return startRow < endRow
  }
}
const legalCol = (startCol, endCol) => {
  return difference(startCol, endCol) === 1;
}

class Checker{
  constructor(color) {
  // Your code here
    if (color === 'white') {
      this.symbol = String.fromCharCode(0x125CB);
    } else {
      this.symbol = String.fromCharCode(0x125CF);
    }
  }
}

class Board {
  constructor() {
    this.grid = []
  
    //SPEC 2.1 - In your Board class, create an attribute called this.checkers and assign it to an empty array. 
    this.checkers = []

    this.selectChecker = this.selectChecker.bind(this);
    this.killChecker = this.killChecker.bind(this);
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
  //In your Board class, write a method this.selectChecker that takes two arguments row, column. All this does is return the checker at that particular spot on this.grid. This will be a handy "helper" function.
  selectChecker(row, col){
    let checker = this.grid[row][col];
    return checker;
  }

  //TODO: THIS MAY HAVE TO BE BOUND TO THIS.

  //In your Board class, write a method killChecker that take a single argument position which is a coordinate pair, eg. [0, 5]. In it, use this.selectChecker to grab the checker at the position given. Find the index of that checker in the this.checkers array. then remove it by .splice()ing it out. Then assign the position on this.grid to null. That checker is dead.

  killChecker(pos){//[4, 1]
    //pos = coordinate pair such as [0,5]. row = pos[0]. col = pos[1];
    let killedChecker = this.selectChecker(pos[0], pos[1]);
    //4, 1
    let killedIndex = this.checkers.indexOf(killedChecker);
    this.checkers.splice(killedIndex, 1);
    this.grid[pos[0]][pos[1]] = null;
  }

}





class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
  //Next, in your Game class, create a this.moveChecker method that takes two parameters start, end. These two arguments will each contain a row and a column, eg. 50, 41. Inside the method, use your board helper method selectChecker to select the checker at your starting rowcolumncoordinates and set it to a local variable checker. Then set that spot on the grid to null and set the spot at the end rowcolumn coordinate to the checker.
  moveChecker(start, end) {
    //start is a string with length of 2, such as 40, where row = string[0] and row =string[1]. 
    let startRow = Number(start[0]);
    let startCol = Number(start[1]);
    let endRow = Number(end[0]);
    let endCol = Number(end[1]);
    const checker = this.board.selectChecker(start[0], start[1]);
    //sets starting position to null (piece removed)
    //checks if move is legal
    
    if(!legalCol (startRow, endRow) || !legalRow(checker, startCol, endCol)) {
      return console.log('invalid move')
    }

    const calculateAdj = (checker, startRow, startCol) => {
      jumpLegal = null;
      let adjCol1 = startCol + 1;
      let adjCol2 = startCol - 1;
      let adjRow = null
      if(isWhite(checker)) {
        adjRow = startRow + 1;
      } else adjRow = startRow - 1;

      return [[adjRow, adjCol1], [adjRow, adjCol2]]
    }

    const adjacents = calculateAdj (checker, startRow, StartCol);
    //if grid at either adjacents[0] || adjacents[1] jumpLegal = true
  
    this.board.grid[start[0]][start[1]] = null;
    //sets ending position to checker (piece placed)
    this.board.grid[end[0]][end[1]] = checker;
    const distance = difference(start[0], end[0]);
    if(distance > 1) {
      let killRow = (startRow + endRow) / 2;
      let killCol = (startCol + endCol) / 2;
      this.board.killChecker([killRow, killCol]);//[4, 1]
    }
  }

  //In the Game class, in the moveChecker method, after you have moved the checker, check to see if the distance of the start row and the end row is 2 by finding the absolute value of the difference between the rows. If so, which means you must have jumped a checker, find the killPostition by finding the midpoint between the start and end positions. Then killChecker.
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
