const { readInput, writeOutput } = require("../../utils");

const DEBUG = 0;

const CACHE = {};

function calcStones(number) {
    function S_T_O_N_E(number, blink) {
        const cacheKey = `${number}-${blink}`;

        if (CACHE[cacheKey] !== undefined) {
            console.log("cache used", cacheKey);
            return CACHE[cacheKey];
        }

        let result;

        if (blink === 75) {
            result = 1;
        } else if (number === 0) {
            result = S_T_O_N_E(1, blink + 1);
        } else if (String(number).length % 2 === 0) {
            const length = String(number).length;
            const leftStone = Number(String(number).substring(0, length / 2));
            const rightStone = Number(String(number).substring(length / 2));

            result = S_T_O_N_E(leftStone, blink + 1) + S_T_O_N_E(rightStone, blink + 1);
        } else {
            result = S_T_O_N_E(number * 2024, blink + 1);
        }

        CACHE[cacheKey] = result;

        return result;
    }

    return S_T_O_N_E(number, 0);
}

function solve(input) {
    const stones = input.split(" ").map((stone) => Number(stone));

    const result = stones.reduce((total, stone) => total + calcStones(stone), 0);

    console.log("\nresulting array", stones);
    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
