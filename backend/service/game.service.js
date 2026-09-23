const initialBoard = [
  { owner: 'black', checkers: 2 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: 'white', checkers: 5 },
  { owner: null, checkers: 0 },
  { owner: 'white', checkers: 3 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: 'black', checkers: 5 },
  { owner: 'white', checkers: 5 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: 'black', checkers: 3 },
  { owner: null, checkers: 0 },
  { owner: 'black', checkers: 5 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: null, checkers: 0 },
  { owner: 'white', checkers: 2 },
];

function pointToIndex(point, color) {
  return color === 'white' ? point - 1 : 24 - point;
}

function calculateDestination(from, die, color) {
  return color === 'white' ? from - die : from + die;
}

function getBarDestination(die, color) {
  return color === 'white' ? 24 - die : die - 1;
}

function distanceToExit(index, color) {
  return color === 'white' ? index + 1 : 24 - index;
}
