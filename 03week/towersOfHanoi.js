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
  const gamePieces = stacks['a'].length;
  if(stacks['b'].length === gamePieces || stacks['c'].length === gamePieces) {
    return true;
  } else return false;
}

function towersOfHanoi(startStack, endStack) {
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
