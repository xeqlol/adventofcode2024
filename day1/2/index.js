const { readInput, writeOutput } = require("../../utils");

function solve(input) {
  input = readInput();

  const [array1, array2] = input
    .split("\n")
    .map((x) => x.split("   ").map((x) => Number(x)))
    .reduce(
      (acc, x) => {
        acc[0].push(x[0]);
        acc[1].push(x[1]);

        return acc;
      },
      [[], []],
    );

  array1.sort();
  array2.sort();

  const result = array1.reduce((total, x) => {
    const times = array2.reduce((acc, y) => {
      return acc + Number(y === x);
    }, 0);
    const similarity = x * times;
    return total + similarity;
  }, 0);
  return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
