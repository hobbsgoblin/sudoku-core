import {isValidPuzzle, checkSolutionIsValid, arraysAreIdentical, copyState, getAllowed} from "../src/sudoku-core";

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
    [null,null,null,5,null,null,null,null,1],  // Last cell in this row (1) is a duplicate value for it's column
    [9,null,null,7,null,2,null,null,null],
    [null,5,1,null,null,4,6,null,2]
  ];

const validCompletedPuzzle =
  [
    [ 2, 1, 3, 4, 5, 6, 7, 8, 9 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 7, 9, 8, 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 4, 3, 6, 5, 8, 9, 7 ],
    [ 3, 6, 7, 9, 1, 8, 2, 4, 5 ],
    [ 5, 8, 9, 2, 4, 7, 6, 3, 1 ],
    [ 9, 3, 2, 8, 7, 1, 5, 6, 4 ],
    [ 8, 7, 5, 6, 3, 4, 9, 1, 2 ],
    [ 6, 4, 1, 5, 9, 2, 3, 7, 8 ]
  ];
const invalidCompletedPuzzle =
  [
    [ 2, 1, 3, 4, 5, 6, 7, 8, 9 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 7, 9, 8, 1, 2, 3, 4, 5, 6 ],
    [ 1, 2, 4, 3, 6, 5, 8, 9, 7 ],
    [ 3, 6, 7, 9, 1, 8, 2, 4, 5 ],
    [ 5, 8, 9, 2, 4, 7, 6, 3, 1 ],
    [ 9, 3, 2, 8, 7, 1, 5, 6, 4 ],
    [ 8, 7, 5, 6, 3, 4, 9, 1, 2 ],
    [ 6, 4, 1, 5, 9, 2, 3, 7, 1 ]  // Last cell in this row (1) is a duplicate value for it's column
  ];

describe('isValidPuzzle', () => {
  test('returns true for a valid puzzle', () => {
    expect(isValidPuzzle(validPuzzle)).toBe(true);
  });
  test('returns false for an invalid puzzle', () => {
    expect(isValidPuzzle(invalidPuzzle)).toBe(false);
  });
});

describe('checkSolutionIsValid', () => {
  test('returns true for a valid solution', () => {
    expect(checkSolutionIsValid(validCompletedPuzzle)).toBe(true);
  });
  test('returns false for an invalid solution', () => {
    expect(checkSolutionIsValid(invalidCompletedPuzzle)).toBe(false);
  });
});

describe('arraysAreIdentical', () => {
  test('returns true for identical arrays', () => {
    expect(arraysAreIdentical(validPuzzle, copyState(validPuzzle))).toBe(true);
  });
  test('returns false for non-identical arrays', () => {
    expect(arraysAreIdentical(validCompletedPuzzle, invalidCompletedPuzzle)).toBe(false);
  });
});

describe('getAllowed', () => {
  test('returns the correct allowed vals for a given puzzle and coordinate', () => {
    expect(getAllowed(validPuzzle, [1, 0])).toEqual(expect.arrayContaining([5,8]))
  });
});