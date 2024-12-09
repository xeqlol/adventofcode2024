const { readInput, writeOutput } = require("../../utils");

function permutations(array) {
    if (array.length === 1) {
        return array;
    }

    const [first, ...rest] = array;

    return permutations(rest)
        .map((perm) => [`${first}+${perm}`, `${first}*${perm}`])
        .flat();
}

function leftToRigntEval(string) {
    let result = 0;
    let currentNumber = "";
    let lastOperation;

    for (let index = 0; index < string.length; index++) {
        const char = string[index];
        if (char !== "+" && char !== "*") {
            currentNumber += char;

            continue;
        }

        if (char === "+" || char === "*") {
            if (!lastOperation) {
                result += Number(currentNumber);
                currentNumber = "";
                lastOperation = char;
                continue;
            }

            if (lastOperation === "+") {
                result += Number(currentNumber);
                currentNumber = "";
                lastOperation = char;
                continue;
            }

            if (lastOperation === "*") {
                result *= Number(currentNumber);
                currentNumber = "";
                lastOperation = char;
                continue;
            }
        }
    }

    if (lastOperation === "+") {
        result += Number(currentNumber);
    }

    if (lastOperation === "*") {
        result *= Number(currentNumber);
    }

    return result;
}

function solve(input) {
    const data = input.split("\n").map((row) => {
        let [test, numbers] = row.split(":");
        numbers = numbers.split(" ").filter((number) => number !== "");

        return [Number(test), numbers];
    });

    const result = data.reduce((total, [test, numbers], index) => {
        console.log(`[${index + 1} of ${data.length}] calc permutations for `, test);
        const anyValidPermutation = permutations(numbers).some((perm) => {
            return leftToRigntEval(perm) == Number(test);
        });

        return anyValidPermutation ? total + test : total;
    }, 0);

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
