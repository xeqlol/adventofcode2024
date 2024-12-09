const { readInput, writeOutput } = require("../../utils");

function solve(input) {
    let data = [];

    let id = 0;
    for (let index = 0; index < input.length; index++) {
        const char = input[index];

        if (index % 2 === 0) {
            data.push(...new Array(Number(char)).fill(id));
            id++;
        } else {
            data.push(...new Array(Number(char)).fill("."));
        }
    }

    let leftIndex = 0;
    let rightIndex = data.length - 1;

    while (leftIndex < rightIndex) {
        if (data[rightIndex] === ".") {
            rightIndex--;
        } else if (data[leftIndex] === ".") {
            data[leftIndex] = data[rightIndex];
            data[rightIndex] = ".";
            rightIndex--;
            leftIndex++;
        } else {
            leftIndex++;
        }
    }

    console.log(data.join(""));

    const result = data.reduce((total, id, index) => (id === "." ? total : total + id * index));

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
