const { readInput, writeOutput } = require("../../utils");

function doMul(str) {
  return str
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .reduce((total, x) => total * Number(x), 1);
}

function solve(rawInput) {
  const input = "do()" + rawInput;
  const processedInput = input.split("don't()").flatMap(rest => rest.split("do()").splice(1)).join();
  

  const allMuls = processedInput.match(/mul\(\d+,\d+\)/g)
  const total = allMuls.reduce((acc, instr) => acc + doMul(instr), 0);

  return total;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
