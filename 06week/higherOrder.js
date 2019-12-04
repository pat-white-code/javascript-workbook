'use strict';

const assert = require('assert');

function forEach(arr, callback) {
  // Your code here
  for (let i = 0 ; i < arr.length ; i++) {
    let element = arr[i];
    let index = i;
    callback(element, index, arr)
  }
}

function map(arr, callback) {
  // Your code here
  //loop through the array
  //callback should be able to access each item's value, index, and the array
  //to each item in the array, perform a function
  //push the result of the function to a new array
  //return the new array
  let mappedArray = []
  for(let i=0 ; i<arr.length ; i++) {
    let item = arr[i]
    let index = i
    let array = arr;
    mappedArray.push(callback(item, index, array));
  }
  return mappedArray
}

function filter(arr, callback) {
  // Your code here
  //create an empty array
  //loop through the given array
  //for each loop, find the given element, index, and array
  //invoke the callback function and pass in the element, index, and array.
  //if the result returns true, then push to new array
  //return the new array
  let filtered = []
  for(let i = 0 ; i < arr.length ; i++) {
    let element = arr[i];
    let index = i;
    let array = arr;
    if(callback(element, index, array)) {
      filtered.push(element)
    }
  }
  return filtered
}

function some(arr, callback) {
  // Your code here
  for (let i = 0 ; i < arr.length ; i++) {
    let element = arr[i];
    let index = i;
    if(callback(element, index, arr)){
      return true;
    }
  }
  return false;
}


function every(arr, callback) {
  // Your code here
  for (let i = 0 ; i < arr.length ; i++) {
    let element = arr[i];
    let index = i;
    if(!callback(element, index, arr)){
      return false;
    }
  }
  return true;
}

function reduce(arr, callback) {


}

if (typeof describe === 'function') {

  describe('#forEach()', () => {
    it('should call the callback the array.length number of times', () => {
      let count = 0;
      forEach([1, 2, 3], () => {
        count++;
      });
      assert.equal(count, 3);
    });
  });

  describe('#map()', () => {
    const arr = [1, 2, 3];
    const mapped = map(arr, (num) => {
      return num * num;
    });
    it('should return new array with mapped items', () => {
      assert.deepEqual(mapped, [1, 4, 9]);
    });
    it('should not affect the original array', () => {
      assert.deepEqual(arr, [1, 2, 3]);
    })
  });

  describe('#filter()', () => {
    it('should return an array of items that pass the predicate test', () => {
      const filtered = filter([1, 2, 3], (num) => {
        return num % 2 === 0;
      });
      assert.deepEqual(filtered, [2]);
    });
  });

  describe('#some()', () => {
    let count = 0;
    const somed = some([1, 2, 3, 4], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return true if at least one item passes the predicate test', () => {
      assert.equal(somed, true);
    });
    it('should stop at the first item that passes the predicate test', () => {
      assert.equal(count, 2);
    });
    it('should return false if no items pass the predicate test', () => {
      const somed = some([1, 3, 5], (num) => {
        return num % 2 === 0;
      });
      assert.equal(somed, false);
    });
  });

  describe('#every()', () => {
    it('should return true if at all passes the predicate test', () => {
      const everied = every([2, 4, 6], (num) => {
        return num % 2 === 0;
      });
      assert.equal(everied, true);
    });
    let count = 0;
    const everied = every([2, 3, 4, 5], (num) => {
      count++;
      return num % 2 === 0;
    });
    it('should return false if any item fails the predicate test', () => {
      assert.equal(everied, false);
    });
    it('should stop at the first item that fails the predicate test', () => {
      assert.equal(count, 2);
    });
  });

  describe('#reduce', ()=>{
    it('should return the sum of the array', ()=>{
      const reduced = reduce([1, 2, 3], (accumulator, current)=>{
        return accumulator + current
      });
      assert.deepEqual(reduced, 6);
    })
  })

} else {

  console.log('Only run the tests on this one!')

}
