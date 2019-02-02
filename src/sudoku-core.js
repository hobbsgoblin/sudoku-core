// Returns all of the values in the same row, column, and square of a given coordinate
export const getAdjacentValues = (state, coord) => {
  const [y, x] = coord;
  const xVals = state[y];
  const yVals = state.map(row => row[x]);
  const squareVals = getValues(state, getSquareCoords(getSquare(y, x)));
  return {x: xVals, y: yVals, squareVals: squareVals};
};

// Returns a puzzle state filled entirely with the given value
export function getInitState(fillVal = null) {
  return Array(9).fill([]).map(() => [...(Array(9).fill(fillVal))]);
}

// Returns all of the coordinates in the same row, column, and square of a given coordinate
export const getAdjacentCoords = coord => {
  const [y, x] = coord;
  const xCoords = [0,1,2,3,4,5,6,7,8].map(y => [y, x]).filter(coord => coord[0] !== y);
  const yCoords = [0,1,2,3,4,5,6,7,8].map(x => [y, x]).filter(coord => coord[1] !== x);
  const squareCoords = getSquareCoords(getSquare(y, x))
    .filter(coord => coord[0] !== y || coord[1] !== x);
  return {x: xCoords, y: yCoords, squareCoords: squareCoords};
};

// Returns all possible legal values for a coordinate
export const getAllowed = (state, coord) => {
  const adjacent = getAdjacentValues(state, coord);
  const adjacentVals = [].concat(adjacent.x, adjacent.y, adjacent.squareVals);
  return [1,2,3,4,5,6,7,8,9].filter(num => {
    return !adjacentVals.includes(num);
  });
};

// Recursively checks if arrays have the same elements
export const arraysAreIdentical = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return undefined;
  if (arr1.length !== arr2.length) return false;

  for (let i = arr1.length; i--;) {
    if (Array.isArray(arr1[i]) || Array.isArray(arr2[i])) {
      if (!arraysAreIdentical(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

// A quick way to check if a puzzle is completed
// Does not verify that the puzzle is completed correctly
export const isSolved = state => ![].concat(...state).includes(null);

// Returns if a puzzle is valid by checking:
// // If the puzzle has at least one empty coordinate
// // If the puzzle is 9 rows by 9 columns
// // If the given values contradict each other
// // Does NOT check if a puzzle is solvable
export const isValidPuzzle = state => {
  const flatState = state.reduce((flatState, row) => flatState.concat(row), []);
  if (!flatState.includes(null)) return false;  // a valid puzzle must have at least one blank cell
  if (state.length !== 9) return false;  // Must have 9 rows
  const hasInvalidVals = state.some((row, y) => {  // return whether any cell values are not allowed for their coordinate
    if (state.some((row) => row.length !== 9)) return true;  // Must have 9 columns
    return row.some((val, x) => {
      if (val === null) return false;  // Ignore empty cells
      const stateCopy = copyState(state);
      stateCopy[y][x] = null;
      return getAllowed(stateCopy, [y, x]).includes(val) === false;  // If cell val isn't in allowed vals, return true
    });
  });
  return !hasInvalidVals;
};

// Checks if the given state is a valid solution
export const checkSolutionIsValid = state => {
  const valsAreValid = (arr) => {
    return arraysAreIdentical([1,2,3,4,5,6,7,8,9], arr.slice().sort());
  };

  const rows = state;
  const cols = [0,1,2,3,4,5,6,7,8].map(x => state.map(row => row[x]));
  const squares = [1,2,3,4,5,6,7,8,9].map(square => getValues(state, getSquareCoords(square)));

  const rowsValid = rows.every(valsAreValid);
  const colsValid = cols.every(valsAreValid);
  const squaresValid = squares.every(valsAreValid);

  return rowsValid && colsValid && squaresValid;
};

// const copyState = (state)  => state.map(arr => [...arr]);

// Return a deep copy of a given state
// Avoids shared references in shallow copies
export function copyState(state) {
  // if (Array.isArray(state)) return state.slice().map(val => copyState(val));
  // Switched to FOR loop for performance
  let i, copy;
  if (Array.isArray(state)) {
    copy = state.slice();
    for (i = 0; i < copy.length; i++) {
      copy[i] = copyState(copy[i]);
    }
    return copy;
  }
  if (state !== null && typeof state === 'object') return false;  // You can't clone an object this way
  return state;
}

// Return a formatted string representation of a game state for display
export const printState = state => {
  return state.reduce((text, row, index) => {
    if (index === 3 || index === 6) {
      text = text.concat("\n");  // Add horizontal spacing
    }
    const rowString = row.reduce((rowText, val, rowIndex) => {
      val = val === null ? '_' : val;
      if (rowIndex === 3 || rowIndex === 6) {
        rowText = rowText.concat(' ');  // Add vertical spacing
      }
      return rowText.concat(' ' + val);
    }, '');
    return text.concat("|" + rowString + " |\n");
  }, '');
};

// Simply returns if the given value is a integer 1 through 9
const isValidValue = val => [1,2,3,4,5,6,7,8,9].includes(val);

// Returns the values for a given array of coordinates
const getValues = (state, coordinates) => {
  return coordinates.map(coord => getValue(state, coord));
};

// Get the value of a given coordinate from a given puzzle state
const getValue = (state, coordinate) => state[coordinate[0]][coordinate[1]];

// Get the square (1 through 9) that contains the given coordinates
// TODO: Consider caching square/coordinate maps to save performance
const getSquare = (y, x) => {
  return [1,2,3,4,5,6,7,8,9].find(square => {
    return getSquareCoords(square).some(coord => {
      return arraysAreIdentical(coord, [y, x]);
    });
  });
};

// Get the coordinates contained within in a given square (1 through 9)
const getSquareCoords = square => squareCoordMap[square];

export const parseState = inputState => {
  return inputState.map(row => {
    return row.map(val => isValidValue(val) ? val : null);
  });
};

// Map of squares to the coordinates they contain
const squareCoordMap = {
  1:[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
  2:[[0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5]],
  3:[[0,6],[0,7],[0,8],[1,6],[1,7],[1,8],[2,6],[2,7],[2,8]],
  4:[[3,0],[3,1],[3,2],[4,0],[4,1],[4,2],[5,0],[5,1],[5,2]],
  5:[[3,3],[3,4],[3,5],[4,3],[4,4],[4,5],[5,3],[5,4],[5,5]],
  6:[[3,6],[3,7],[3,8],[4,6],[4,7],[4,8],[5,6],[5,7],[5,8]],
  7:[[6,0],[6,1],[6,2],[7,0],[7,1],[7,2],[8,0],[8,1],[8,2]],
  8:[[6,3],[6,4],[6,5],[7,3],[7,4],[7,5],[8,3],[8,4],[8,5]],
  9:[[6,6],[6,7],[6,8],[7,6],[7,7],[7,8],[8,6],[8,7],[8,8]],
};
