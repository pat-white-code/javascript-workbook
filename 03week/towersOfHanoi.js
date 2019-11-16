'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

let turns = 0;

function printStacks() {
  console.log("Turn: " + turns);
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  //removes and stores piece being moved
  const removedPiece = startStack.pop();

  //adds piece being moved to new stack
  endStack.push(removedPiece);
}

const isValid = (inputArr) => {
  const allStrings = inputArr.map(input => input.toString())
  let validRegex = /[a-d]/;
  return allStrings.every(input => input.match(validRegex));
}

//helpter function to find and return the last piece of an array
const lastPiece = (arr) =>  arr.find((item, index, arr) => {index === arr.length - 1})

function isLegal(startStack, endStack) {
  // If there are no blocks on end stack, this move is legal
  if(!endStack[0]) {
    return true;
  } 
  //If last piece of startStack is smaller than last piece of endStack, return true, otherwise false.
  return (lastPiece(startStack) < lastPiece(endStack));
}

function checkForWin() {

  //returns and saves an array representation of the object.
  const objectArray = Object.entries(stacks);
  let gamePieces = 0;

  //keyArray[1] represents the value of each key
  objectArray.forEach(keyArray => {gamePieces += keyArray[1].length})

  //if any array other than index 0 (stack a) has all the gamepieces, user wins
  for (let i = 1 ; i < objectArray.length ; i++) {
    if(objectArray[i][1].length === gamePieces) {
      return true;
    }
  };
  //if no win...
  return false;
}

function towersOfHanoi(startInput, endInput) {
  
  //find and store the arrays as startStack and endStack
  const startStack = stacks[startInput];
  const endStack = stacks[endInput];

  //If input is not valid, do not allow
  if(!isValid([startInput, endInput])){
    console.log('Not Valid Input');
    return;
  }
  // If the move is not legal, do not allow
  if(!isLegal(startStack, endStack)) {
    console.log('Not Allowed');
    return;
  }

  movePiece(startStack, endStack);
  turns++;

  if(checkForWin()) {
    console.log('WINNER!');
  };
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('turns *new function* new test', ()=>{
    //new test
    it('should keep track of turns', ()=>{
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      turns = 0;
      towersOfHanoi('a', 'b');
      assert.equal(turns, 1);
    });
  });
  describe('isValid() *new function* new tests(2)', ()=>{
    it('should stop invalid input', ()=>{
      assert.equal(isValid([1, 2]), false);
    });//new test #2
    it('should not block valid input', ()=>{
      assert.equal(isValid(['a', 'b']), true);
    })
  })
  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal(stacks['a'], stacks['b']), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal(stacks['a'], stacks['c']), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
