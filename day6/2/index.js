const { readInput, writeOutput } = require("../../utils");

function canStepForward(x, y, dx, dy, map) {
    return map[x + dx][y + dy] !== "#" && map[x + dx][y + dy] !== "O";
}

function isStepOutsideOfMap(x, y, dx, dy, map) {
    return x + dx < 0 || x + dx >= map.length || y + dy < 0 || y + dy >= map.length;
}

function rotate90Right(dx, dy) {
    // [-1, 0] : top
    // [0, 1] : right
    // [1, 0] : down
    // [0, -1] : left

    if (dx === -1 && dy === 0) {
        return [0, 1]; // right
    }

    if (dx === 0 && dy === 1) {
        return [1, 0]; // down
    }

    if (dx === 1 && dy === 0) {
        return [0, -1]; // left
    }

    if (dx === 0 && dy === -1) {
        return [-1, 0]; // top
    }
}

function isCycled(map) {
    const visited = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(0));
    // start position
    let x = map.findIndex((row) => row.includes("^"));
    let y = map[x].findIndex((column) => column === "^");
    let dx = -1;
    let dy = 0;
    // first position
    visited[x][y] += 1;

    while (!isStepOutsideOfMap(x, y, dx, dy, map)) {
        if (canStepForward(x, y, dx, dy, map)) {
            x += dx;
            y += dy;
            if (visited[x][y] > 10) {
                return true;
            }

            visited[x][y] += 1;
        } else {
            [dx, dy] = rotate90Right(dx, dy);
        }
    }

    return false;
}

function solve(input) {
    const map = input.split("\n").map((row) => row.split(""));
    let result = 0;

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] === "#" || map[i][j] === "^") {
                continue;
            }

            console.log("map variant for", i, j);
            const newMap = JSON.parse(JSON.stringify(map));
            newMap[i][j] = "O";
            const isMapCycled = isCycled(newMap);
            console.log("map ", i, j, "is cycled", isMapCycled);

            if (isMapCycled) {
                result += 1;
            }
        }
    }

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
