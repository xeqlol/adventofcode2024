const fs = require("fs");

const INPUT_FILE = "input.txt";
const OUTPUT_FILE = "output.txt";

function readInput() {
  try {
    return fs.readFileSync(INPUT_FILE, "utf8").trim();
  } catch (error) {
    console.error(`Error reading file ${INPUT_FILE}:`, error.message);
    process.exit(1);
  }
}

function writeOutput(data) {
  try {
    console.log(`output: ${data.toString()}`);
    fs.writeFileSync(OUTPUT_FILE, data.toString(), "utf8");
  } catch (error) {
    console.error(`Error writing to file ${OUTPUT_FILE}:`, error.message);
    process.exit(1);
  }
}

module.exports = { readInput, writeOutput };
