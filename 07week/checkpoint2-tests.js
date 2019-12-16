//this is a file for testing code in checkpoint-2 
//references to document are commented out.
//the code in this file is a copy of checkpoint-2 .js

const assert = require('assert');

const arrOfPeople = [
  {
    id: 2,
    name: "Charles Young",
    age: 55,
    skillSet: "welding",
    placeBorn: "Omaha, Nebraska"
  },
  {
    id: 3,
    name: "Judy Twilight",
    age: 35,
    skillSet: "fishing",
    placeBorn: "Louisville, Kentucky"
  },
  {
    id: 4,
    name: "Cynthia Doolittle",
    age: 20,
    skillSet: "tic tac toe",
    placeBorn: "Pawnee, Texas"
  },
  {
    id: 5,
    name: "John Willouby",
    age: 28,
    skillSet: "pipe fitting",
    placeBorn: "New York, New York"
  },
  {
    id: 6,
    name: "Stan Honest",
    age: 20,
    skillSet: "boom-a-rang throwing",
    placeBorn: "Perth, Australia"
  },
  {
    id: 7,
    name: "Mia Watu",
    age: 17,
    skillSet: "acrobatics",
    placeBorn: "Los Angeles, California"
  },
  {
    id: 8,
    name: "Walter Cole",
    age: 32,
    skillSet: "jump rope",
    placeBorn: "New Orleans, Louisiana"
  },
]

let listOfPlayers = []
let blueTeam = []
let redTeam = []

class Player {
  constructor(id, name, age, skillSet, placeBorn){
    this.id = id;
    this.name = name;
    this.age = age;
    this.skillSet = skillSet;
    this.placeBorn = placeBorn;
    this.canThrowBall = true;
    this.isPaid = true;
    this.isHealthy = true;
    this.yearsExperience = 0;
  }
}
class Teammate extends Player {
  constructor(id, name, age, skillSet, placeBorn, canThrowBall, isPaid, isHealthy, yearsExperience, mascot, teamColor){
    super(id, name, age, skillSet, placeBorn, canThrowBall, isPaid, isHealthy, yearsExperience)
    this.mascot = mascot
    this.teamColor = teamColor;
  }
}

class RedTeammate {
  constructor(){}
}

const listPeopleChoices = () => {
  const listElement = document.getElementById('people')
  listElement.innerHTML = '';
  arrOfPeople.map(person => {
    const li = document.createElement("li")
    const button = document.createElement("button")
    button.innerHTML = "Make Player"
    button.addEventListener('click', function() {makePlayer(person.id)} )
    li.appendChild(button)
    li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))
    listElement.append(li)
  })
}

const indexById = (element) => element.id === id;

const getPlayer = (id) => {
  const index = arrOfPeople.findIndex(element => element.id === id);
  return arrOfPeople[index];
}

const listPlayers = () => {
  const playerList = document.getElementById('players');
  playerList.innerHTML = '';
  listOfPlayers.forEach(player => {
    let li = document.createElement('li');
    li.innerText = `${player.name}: ${player.skillSet}`
    playerList.appendChild(li);
    li.appendChild(teamButton('red', player.id));
    li.appendChild(teamButton('blue', player.id));
  })
}

const teamButton = (color, id) => {
  let button = document.createElement('button');
  button.innerText = `${color} Team`;
  button.classList.add(`${color}-button`);
  button.dataset.id = id;
  button.addEventListener('click', ()=>{
    console.log('color', color, 'id', id);
    makeTeammate(color, id);
  })
  return button
}

const makePlayer = (id) => {
  console.log(`li ${id} was clicked!`);
  const index = arrOfPeople.findIndex(element => element.id === id)
  const player = getPlayer(id);
  const newPlayer = new Player(player.id, player.name, player.skillSet, player.placeBorn);
  listOfPlayers.push(newPlayer);
  console.log(listOfPlayers);
  arrOfPeople.splice(index, 1);
  // listPeopleChoices();
  // listPlayers();
}

const makeTeammate = (color, id) => {
  let mascot = null;
  let teamColor = color;
  let team = null;
  if(color === 'red') {
    mascot = 'Wolves'
    team = redTeam;
  } else {
    mascot = 'Dolphins'
    team = blueTeam
  }
  const index = listOfPlayers.findIndex(player => player.id === id);
  const player = listOfPlayers[index];
  const newTeammate = new Teammate(player.id, player.name, player.age, player.skillSet, player.placeBorn, player.canThrowBall, player.isPaid, player.isHealthy, player.yearsExperience, mascot, teamColor);
  team.push(newTeammate);
  listOfPlayers.splice(index, 1);
  // listPlayers();
  // listTeammate(newTeammate, color);
}

const listTeammate = (teammate, color) => {
  const teamList = document.getElementById(`${color}`);
  let li = document.createElement('li');
  li.innerText = `${teammate.name}: ${teammate.skillSet}`
  teamList.appendChild(li);
}

describe('makePlayer', () => {
  it('should add a person to the list of players', ()=> {
    listOfPlayers = [];
    makePlayer(2);
    assert.equal(listOfPlayers.length, 1);

    listOfPlayers = [];
  });
  it('should add player properties to new players', ()=> {
    listOfPlayers = [];
    makePlayer(3);
    let player = listOfPlayers[0];
    assert(player.isPaid);
    assert(player.isHealthy);
    assert(player.canThrowBall);
  });
});
describe('makePlayer', () => {
  it('should add players to the correct team', ()=> {
    makeTeammate('blue', 3);
    assert.equal(blueTeam.length, 1);
  });
  it('should add team properties to new teammates', ()=> {
    let bluePlayer = blueTeam[0];
    assert.equal(bluePlayer.teamColor, 'blue');
  });
});


// describe('makeTeammate', ()=>{
//   it('should add players to the correct team'), ()=> {
//     // blueTeam = [];
//     makeTeammate('blue', 3);
//     assert(blueTeam);
//   }
// }
// )