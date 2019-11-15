let result = "";
let i = 0;

do {
  result += `${i} `;
  i++
} while (i < 1000);

console.log(result);
// expected result: "12345"

//2. Create an object (an array with keys and values) called person with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"

const person = {
  firstName: "jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}

//Use a for...in loop and if statement to console.log the value associated with the key birthDate if the birth year is an odd number.

let regexYear = /\d{4}/;
let foundYear = person.birthDate.match(regexYear);

console.log('results from reg-ex : ', foundYear);

//3. --- Use a for...in loop and if statement to console.log the value associated with the key birthDate if the birth year is an odd number.

for (const property in person) {

  if(property === "birthDate") {
    //split the string into an array after each space and save as new variable
    propertyArray = person[property].split(' ');

    //find and store the last index
    let lastIndex = propertyArray.length - 1;

    //find and store the birth year, converted to number
    let birthYear = Number(propertyArray[lastIndex]);

    //if birthyear is odd, console.log
    if(birthYear % 2 !== 0) {
      console.log('birth year : ', birthYear)
    }
  }
}

//4. --- Create an arrayOfPersons that contains mulitiple objects. You can simply copy/paste the person object you made above multiple times. Feel free to change the values to reflect multiple people you might have in your database.

const person1 = {
  firstName: "Pat",
  lastName: "White",
  birthDate: "August 31, 1986",
  gender: "male"
}

const person2 = {
  firstName: "Morgan",
  lastName: "White",
  birthDate: "Feb 21, 1991",
  gender: "female"
}

const person3 = {
  firstName: "David",
  lastName: "White",
  birthDate: "Jan 16, 2018",
  gender: "male"
}

let personArray = [person1, person2, person3];

//5. ---- Use .map() to map over the arrayOfPersons and console.log() their information.
//( forEach is better for just printing to console, in my opinion )

const printedPeople = personArray.map(person => {
  console.log('Printed Person : ', person);
  return person
})

//6. --- Use .filter() to filter the persons array and console.log only males in the array.

const males = personArray.filter(person => person.gender === "male");

console.log("Males : ", males);

//Use .filter() to filter the persons array and console.log only people that were born before Jan 1, 1990.

//this works but was refactored below
// const eightiesBabies = personArray.filter(person => {
//   let birthArray = person.birthDate.split(' ');
//   let lastIndex = birthArray.length - 1;
//   let birthYear = Number(birthArray[lastIndex]);
//   return birthYear < 1990
// })

//birthYear logic from earlier refactored to separate function
const birthYear = (person) => {
  let birthArray = person.birthDate.split(' ');
  let lastIndex = birthArray.length - 1;
  return Number(birthArray[lastIndex]);
}

const eightiesBabies = personArray.filter(person => birthYear(person) < 1990);

console.log('Eighties Babies : ', eightiesBabies)

console.log('I love this table and chairs!');