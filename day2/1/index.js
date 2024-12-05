const { readInput, writeOutput } = require("../../utils");

function isIncreasing(array) {
  return array.every(
    (value, index, array) => index === 0 || value >= array[index - 1],
  );
}

function isDecreasing(array) {
  return array.every(
    (value, index, array) => index === 0 || value <= array[index - 1],
  );
}

function areNumbersNotThatFar(array) {
  return array.reduce((result, _, index) => {
    if (index === 0) {
      return true;
    }

    const a = array[index];
    const b = array[index - 1];
    const diff = Math.abs(a - b);
    const isInRange = 1 <= diff && diff <= 3;

    return result && isInRange;
  }, true);
}

function solve(input) {
  const reports = input
    .split("\n")
    .map((rawReport) => rawReport.split(" ").map((level) => Number(level)));

  const safeReportsCount = reports.reduce((total, report) => {
    const isSafeReport =
      (isIncreasing(report) || isDecreasing(report)) &&
      areNumbersNotThatFar(report);

    if (!areNumbersNotThatFar(report)) {
      console.log(
        report,
        isIncreasing(report),
        isDecreasing(report),
        areNumbersNotThatFar(report),
      );
    }

    return isSafeReport ? total + 1 : total;
  }, 0);

  console.log(safeReportsCount);

  return safeReportsCount;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData.toString());
