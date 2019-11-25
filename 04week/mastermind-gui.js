'use strict';

console.log('mastermind here...')

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let guess = '';

function placeBall(event) {
  const piece = event.target.dataset.piece;
  const domSpot = document.querySelector('.row__spot.unplayed');
  placePiece(piece, domSpot);
  console.log(domSpot);
  domSpot.classList.remove('unplayed');
  guess += piece;
  console.log(guess);
}

document.querySelector('.row__submit').addEventListener('click', ()=>{
  mastermind(guess);
});

// document.querySelector('.row__submit').addEventListener('click', ()=>{console.log(guess)});

const placePiece = (piece, domSpot) => {
  domSpot.innerText = piece;
}

document.querySelectorAll('.player__piece').forEach(element => {
  element.addEventListener('click', placeBall);
})

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  // your code here
  const solutionArray = solution.split('');
  const guessArray = guess.split('');
  let redPegs = 0;
  let whitePegs = 0;
  let targetIndex = null;

  for(let i = 0 ; i < solutionArray.length ; i++) {
    if(solutionArray[i] === guessArray[i]) {
      redPegs++
      solutionArray[i] = null;
    }
  }

  for(let j = 0 ; j < solutionArray.length ; j++) {
    targetIndex = solutionArray.indexOf(guessArray[j]);
    if(targetIndex !== -1) {
      whitePegs++
      solutionArray[targetIndex] = null;
    }
  }

  hintDom(redPegs, 'red-peg');
  hintDom(whitePegs, 'white-peg');

  return `${redPegs}-${whitePegs}`
}

function hintDom(pegs, color) {
  let pegDom = document.querySelectorAll(".row__results__hint.unplayed");
  for(let i = 0 ; i < pegs ; i ++) {
    pegDom[i].classList.add(color);
    pegDom[i].classList.remove("unplayed");
  }
}


function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here

  if(checkWin(guess, solution)){
    console.log(checkWin(guess, solution));
    return checkWin(guess, solution);
  }

  let hint = generateHint(guess);
  board.push(`${guess} ${hint}`);
  console.log(`turn: ${board.length}`);
  console.log(checkLoss(solution));
}

function checkWin(guess, solution) {
  if(guess === solution) {
    return `You guessed it!`
  }
}

function checkLoss(solution) {
  let turn = board.length;
  if(turn > 9) {
    return `You ran out of turns! The solution was ${solution}`
  } else {
    return 'Guess Again.'
  }
}
