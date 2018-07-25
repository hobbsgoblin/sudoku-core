import {isValidPuzzle} from "../src/sudoku-core";

const validPuzzle =
  [
    [null,null,null,null,5,null,null,6,null],
    [null,null,7,1,4,3,2,null,9],
    [null,null,null,null,6,null,4,5,1],
    [2,1,3,null,null,null,null,null,6],
    [null,7,null,6,null,null,null,3,5],
    [6,null,5,null,9,null,null,2,null],
    [null,null,null,5,null,null,null,null,null],
    [9,null,null,7,null,2,null,null,null],
    [null,5,1,null,null,4,6,null,2]
  ];

const invalidPuzzle =
  [
    [null,null,null,null,5,null,null,6,null],
    [null,null,7,1,4,3,2,null,9],
    [null,null,null,null,6,null,4,5,1],
    [2,1,3,null,null,null,null,null,6],
    [null,7,null,6,null,null,null,3,5],
    [6,null,5,null,9,null,null,2,null],
    [null,null,null,5,null,null,null,null,1],  // Last cell in this row is a duplicate value for it's column
    [9,null,null,7,null,2,null,null,null],
    [null,5,1,null,null,4,6,null,2]
  ];



test('correctly determines if puzzle is valid', () => {
  expect(isValidPuzzle(validPuzzle)).toBe(true);
  expect(isValidPuzzle(invalidPuzzle)).toBe(false);
});