Codeplan:

1. Get the current startStack and endStack values (either through the user unput or test values) inside towersOfHanoi function.
- pass those values to isLegal function.
- pass those values to movePiece function.

2. Check that a piece is allowed to move (isLegal)
  - Use the startStack and endStack values to determine if it would be a legal move bassed off the rules of the game:
    - a bigger number cannot be placed on top of a smaller number.
    - start stack and end stack should be different letters.
    - access the numbers inside the arrays that correspond to the startStack/endstack values (abc) these are the keys of the stacks  object.
    - any numbe can be placed on an empty stack ()
  - Return error message if user input is invalid (bonus).
  - Make sure user input values are 1 char long.


3. Move a piece from one stack to another. (movePiece)
  - Update the stacks obkect inside of the movePiece function using the startStack and endStack values.
  - take the value off the end of the startStack array and add it to the end of the endstack array
    - use pop/push?

4. Check to see if the game is won (checkForWin)
  - all blocks are stacked into column 2 or 1, return true otherwise false.
  - Nice to have: console.log a winning message.