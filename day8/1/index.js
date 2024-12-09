const { readInput, writeOutput } = require("../../utils");

function isInBoundary([x, y], map) {
    return 0 <= x && x < map.length && 0 <= y && y < map.length;
}

function getAntinodesByTwoPoints([x1, y1], [x2, y2]) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const antinodes = [
        [x1 - dx, y1 - dy],
        [x2 + dx, y2 + dy],
    ];

    return antinodes;
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

                const [antinode1, antinode2] = getAntinodesByTwoPoints(locations[i], locations[j]);
                console.log(
                    `antinodes for locations ${locations[i]} and ${locations[j]}: ${antinode1} and ${antinode2}`
                );

                if (isInBoundary(antinode1, map)) {
                    antinodesMap[antinode1[0]][antinode1[1]] = "#";
                }

                if (isInBoundary(antinode2, map)) {
                    antinodesMap[antinode2[0]][antinode2[1]] = "#";
                }
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
