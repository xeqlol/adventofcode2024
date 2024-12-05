const { readInput, writeOutput } = require("../../utils");

function solve(input) {
  const result = input
    .match(/mul\(\d+,\d+\)/g)
    .map((x) => x.replace("mul(", "").replace(")", "").split(","))
    .reduce((total, [a, b]) => total + a * b, 0);

  return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
