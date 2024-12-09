const { readInput, writeOutput } = require("../../utils");

function isInBoundary([x, y], map) {
    return 0 <= x && x < map.length && 0 <= y && y < map.length;
}

function getAntinodesByTwoPoints([x1, y1], [x2, y2], map) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const antinodesForward = [[x2, y2]];
    const antinodesBackward = [[x1, y1]];

    let stopForward = false;
    let stopBackward = false;

    while (!(stopBackward && stopForward)) {
        const lastForwardAntinode = antinodesForward[antinodesForward.length - 1];
        const lastBackwardAntinode = antinodesBackward[antinodesBackward.length - 1];
        const nextForwardAntinode = [lastForwardAntinode[0] + dx, lastForwardAntinode[1] + dy];
        const nextBackwardAntinode = [lastBackwardAntinode[0] - dx, lastBackwardAntinode[1] - dy];

        console.log(antinodesForward, antinodesBackward);

        if (isInBoundary(nextForwardAntinode, map) && !stopForward) {
            antinodesForward.push(nextForwardAntinode);
        } else {
            stopForward = true;
        }

        if (isInBoundary(nextBackwardAntinode, map) && !stopBackward) {
            antinodesBackward.push(nextBackwardAntinode);
        } else {
            stopBackward = true;
        }
    }

    return antinodesForward.concat(antinodesBackward);
}

function solve(input) {
    const map = input.split("\n").map((row) => row.split(""));
    const antinodesMap = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill("."));
    const antenasLocationsByFrequency = {};

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map.length; y++) {
            const point = map[x][y];

            if (point === ".") {
                continue;
            }

            antenasLocationsByFrequency[point] ??= [];
            antenasLocationsByFrequency[point].push([x, y]);
        }
    }

    Object.keys(antenasLocationsByFrequency).forEach((frequency) => {
        const locations = antenasLocationsByFrequency[frequency];
        for (let i = 0; i < locations.length; i++) {
            for (let j = i; j < locations.length; j++) {
                if (i === j) {
                    continue;
                }

                const antinodes = getAntinodesByTwoPoints(locations[i], locations[j], map);
                console.log(`antinodes for locations ${locations[i]} and ${locations[j]}: ${antinodes.join(" ")}`);

                antinodes.forEach(([x, y]) => {
                    if (isInBoundary([x, y], map)) {
                        antinodesMap[x][y] = "#";
                    }
                });
            }
        }
    });

    console.log(antinodesMap.map((row) => row.join("")).join("\n"));
    console.log("\n");
    console.log(map.map((row) => row.join("")).join("\n"));

    const result = antinodesMap.flat(2).filter((char) => char === "#").length;

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
