const { readInput, writeOutput } = require("../../utils");

function isStepsInBoundary(x, y, map) {
  const isStepsInBoundary =
    x + 1 < map.length && x - 1 >= 0 && y + 1 < map[0].length && y - 1 >= 0;

  console.log(` - steps at (${x},${y}) in boundary: ${isStepsInBoundary}`);

  return isStepsInBoundary;
}

function getMASCountAtPosition(x, y, map) {
  let total = 0;

  if (
    isStepsInBoundary(x, y, map) &&
    map[x - 1][y - 1] === "M" &&
    map[x + 1][y + 1] === "S" &&
    map[x - 1][y + 1] === "M" &&
    map[x + 1][y - 1] === "S"
  ) {
    console.log(`found
M M
 A
S S 
at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, map) &&
    map[x - 1][y - 1] === "M" &&
    map[x + 1][y + 1] === "S" &&
    map[x - 1][y + 1] === "S" &&
    map[x + 1][y - 1] === "M"
  ) {
    console.log(`found
M S
 A
M S 
at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, map) &&
    map[x - 1][y - 1] === "S" &&
    map[x + 1][y + 1] === "M" &&
    map[x - 1][y + 1] === "S" &&
    map[x + 1][y - 1] === "M"
  ) {
    console.log(`found
S S
 A
M M 
at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, map) &&
    map[x - 1][y - 1] === "S" &&
    map[x + 1][y + 1] === "M" &&
    map[x - 1][y + 1] === "M" &&
    map[x + 1][y - 1] === "S"
  ) {
    console.log(`found
S M
 A
S M 
at (${x},${y})`);
    total += 1;
  }

  console.log(`total count of XMAS at (${x},${y}) is ${total}`);

  return total;
}

function solve(input) {
  const map = input.split("\n").map((row) => row.split(""));
  let total = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] === "A") {
        console.log(`A found at (${x},${y})`);
        total += getMASCountAtPosition(x, y, map);
        console.log(`\n`);
      }
    }
  }

  console.log(total);

  return total;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
