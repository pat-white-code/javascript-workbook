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

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {

  const moveStack = stacks[startStack];
  const dropStack = stacks[endStack];
  const removedPiece = moveStack.pop();
  dropStack.push(removedPiece);

}

function isLegal(startStack, endStack) {
  // Your code here
  if(!stacks[endStack][0]) {
    return true;
  }
  const index1 = stacks[startStack].length - 1;
  const index2 = stacks[endStack].length - 1;

  return (stacks[startStack][index1] < stacks[endStack][index2])
}

function checkForWin() {
  // Your code here
  const objectArray = Object.entries(stacks);
  let gamePieces = 0;
  for (let i = 0 ; i < objectArray.length ; i ++) {
    gamePieces = gamePieces + objectArray[i][1].length;
  }
  for (let i = 1 ; i < objectArray.length ; i++) {
    if(objectArray[i][1].length === gamePieces) {
      return true;
    }
  };
  return false;
}

function towersOfHanoi(startStack, endStack) {
  if(!isValid([startStack.toString(), endStack.toString()])){
    console.log('Not Valid Input');
    return;
  }
  // Your code here
  if(!isLegal(startStack, endStack)) {
    console.log('Not Allowed');
    return;
  }
  movePiece(startStack, endStack);
  if(checkForWin()) {
    console.log('WINNER!');
  };
}

const isValid = (inputArr) => {
  const allStrings = inputArr.map(input => input.toString())
  let validRegex = /[a-d]/;
  return allStrings.every(input => input.match(validRegex));
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
  describe('isValid() *new function*', ()=>{
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
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
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
