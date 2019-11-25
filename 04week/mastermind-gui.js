'use strict';

console.log('mastermind here...')

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let input = '';

function placeBall(event) {
  const piece = event.target.dataset.piece;
  const domSpot = document.querySelector(`[data-turn="${board.length}"] .row__spot.unplayed`);
  placePiece(piece, domSpot);
  console.log(domSpot);
  domSpot.classList.remove('unplayed');
  domSpot.classList.add('played')
  input += piece;
  console.log(input);
}

function undo() {
  let played = document.querySelectorAll(`[data-turn="${board.length}"] .row__spot.played`);
  let lastPlayed = played[played.length-1];
  lastPlayed.innerText = '';
  lastPlayed.classList.remove('played');
  lastPlayed.classList.add('unplayed');
}

//this needs to happen at beginning of each turn
document.querySelector(`[data-turn="${board.length}"] .row__submit`).addEventListener('click', ()=>{
  mastermind(input);
});

document.querySelector(`[data-turn="${board.length}"] .row__undo`).addEventListener('click', undo);

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

function hintDom(pegs, color) {
  let pegDom = document.querySelectorAll(`[data-turn="${board.length}"] .row__results__hint.unplayed`);
  for(let i = 0 ; i < pegs ; i ++) {
    pegDom[i].classList.add(color);
    pegDom[i].classList.remove("unplayed");
  }
}

function revealSolution(solution){
  let solutionSpots = document.querySelectorAll('.solution-spot');
  for(let i = 0 ; i < solutionSpots.length ; i ++) {
    solutionSpots[i].innerText = solution[i]
  }
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

function renderLoss() {
  document.querySelector('.solution-row').classList.add('loser')
}

function mastermind(guess) {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here

  if(checkWin(guess, solution)){
    console.log(checkWin(guess, solution));
    revealSolution(solution);
    renderWin();
    return checkWin(guess, solution);
  }

  if(checkLoss(solution) === `You ran out of turns! The solution was ${solution}`) {
    revealSolution(solution)
    renderLoss()
    return;
  }

  let hint = generateHint(guess);

  document.querySelector(`[data-turn="${board.length}"] .row__submit`).removeEventListener('click', ()=>{
    mastermind(guess);
  });
  
  document.querySelector(`[data-turn="${board.length}"] .row__undo`).removeEventListener('click', undo);

  //changes the turn
  board.push(`${guess} ${hint}`);
  
  document.querySelector(`[data-turn="${board.length}"] .row__submit`).addEventListener('click', ()=>{
    mastermind(input);
  });

  document.querySelector(`[data-turn="${board.length}"] .row__undo`).addEventListener('click', undo);

  input = '';
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

function renderWin(){
  document.querySelector('.solution-row').classList.add('winner');
}