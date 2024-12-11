const { readInput, writeOutput } = require("../../utils");

const DEBUG = 0;

function solve(input) {
    const stones = input.split(" ").map((stone) => Number(stone));

    for (let blink = 0; blink < 25; blink++) {
        for (let i = 0; i < stones.length; i++) {
            let stone = stones[i];

            if (stone === 0) {
                stones[i] = 1;

                DEBUG && console.log(`[blink ${blink}] step ${i}, found 0, replace by 1`, stones);

                continue;
            }

            const stringStone = String(stone);

            if (stringStone.length % 2 === 0) {
                const oldValue = stones[i];
                const leftStone = stringStone.substring(0, stringStone.length / 2);
                const rightStone = stringStone.substring(stringStone.length / 2);

                stones[i] = Number(leftStone);
                stones.splice(i + 1, 0, Number(rightStone));

                DEBUG &&
                    console.log(
                        `[blink ${blink}] step ${i}, found even boy ${oldValue}, replace by two new stones: ${leftStone} and ${rightStone}`,
                        stones
                    );

                i += 1;
                continue;
            }

            stones[i] *= 2024;

            DEBUG &&
                console.log(`[blink ${blink}] step ${i}, nothing to do here, multiply by 2024: ${stones[i]}`, stones);
        }
        console.log("blink ", blink, stones.length);
    }

    const result = stones.length;

    console.log("\nresulting array", stones);
    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
