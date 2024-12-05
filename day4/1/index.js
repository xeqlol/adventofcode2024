const { readInput, writeOutput } = require("../../utils");

function isStepsInBoundary(x, y, dx, dy, map) {
  const isStepsInBoundary =
    x + dx < map.length && x + dx >= 0 && y + dy < map[0].length && y + dy >= 0;

  console.log(
    ` - steps (${dx},${dy}) at (${x},${y}) in boundary: ${isStepsInBoundary}`
  );

  return isStepsInBoundary;
}

function getXMASCountAtPosition(x, y, map) {
  let total = 0;

  if (
    isStepsInBoundary(x, y, 3, 0, map) &&
    map[x + 1][y] === "M" &&
    map[x + 2][y] === "A" &&
    map[x + 3][y] === "S"
  ) {
    console.log(`vertical forward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, -3, 0, map) &&
    map[x - 1][y] === "M" &&
    map[x - 2][y] === "A" &&
    map[x - 3][y] === "S"
  ) {
    console.log(`vertical backward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, 0, 3, map) &&
    map[x][y + 1] === "M" &&
    map[x][y + 2] === "A" &&
    map[x][y + 3] === "S"
  ) {
    console.log(`horizontal forward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, 0, -3, map) &&
    map[x][y - 1] === "M" &&
    map[x][y - 2] === "A" &&
    map[x][y - 3] === "S"
  ) {
    console.log(`horizontal backward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, 3, 3, map) &&
    map[x + 1][y + 1] === "M" &&
    map[x + 2][y + 2] === "A" &&
    map[x + 3][y + 3] === "S"
  ) {
    console.log(`primary diagonal forward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, -3, -3, map) &&
    map[x - 1][y - 1] === "M" &&
    map[x - 2][y - 2] === "A" &&
    map[x - 3][y - 3] === "S"
  ) {
    console.log(`primary diagonal backward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, 3, -3, map) &&
    map[x + 1][y - 1] === "M" &&
    map[x + 2][y - 2] === "A" &&
    map[x + 3][y - 3] === "S"
  ) {
    console.log(`secondary diagonal forward at (${x},${y})`);
    total += 1;
  }

  if (
    isStepsInBoundary(x, y, -3, 3, map) &&
    map[x - 1][y + 1] === "M" &&
    map[x - 2][y + 2] === "A" &&
    map[x - 3][y + 3] === "S"
  ) {
    console.log(`secondary diagonal backwards at (${x},${y})`);
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
      if (map[x][y] === "X") {
        console.log(`X found at (${x},${y})`);
        total += getXMASCountAtPosition(x, y, map);
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
