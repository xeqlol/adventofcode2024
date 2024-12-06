const { readInput, writeOutput } = require("../../utils");

function canStepForward(x, y, dx, dy, map) {
    return map[x + dx][y + dy] !== "#";
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

function solve(input) {
    const map = input.split("\n").map((row) => row.split(""));
    console.log(map);
    const visited = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(0));
    // start position
    let x = map.findIndex((row) => row.includes("^"));
    let y = map[x].findIndex((column) => column === "^");
    let dx = -1;
    let dy = 0;

    while (!isStepOutsideOfMap(x, y, dx, dy, map)) {
        if (canStepForward(x, y, dx, dy, map)) {
            visited[x][y] = true;
            console.log("step forward", x, y);
            x += dx;
            y += dy;
        } else {
            [dx, dy] = rotate90Right(dx, dy);
            console.log("rotate", dx, dy);
        }
    }

    visited[x][y] = true; // last position

    const result = visited.flat(2).filter((x) => Boolean(x)).length;

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
