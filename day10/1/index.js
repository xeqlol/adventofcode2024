const { readInput, writeOutput } = require("../../utils");

function isInBoundary(x, y, dx, dy, map) {
    return 0 <= x + dx && x + dx < map.length && 0 <= y + dy && y + dy < map.length;
}

function getNSpace(n) {
    return " ".repeat(n);
}

const DIRECTIONS = [
    /** top */ [-1, 0],
    /** right */ [0, 1],
    /** down */ [1, 0],
    /** left */ [0, -1],
];

function countScoreForTrailhead(x, y, map) {
    let total = 0;
    const visited = new Array(map.length).fill(0).map(() => new Array(map[0].length).fill(false));

    function _M_E_G_A_O_V_E_R_9_0_0_0_R_E_C_U_R_S_I_O_N_(x, y, map, step = 0) {
        console.log(`${getNSpace(step)}> okay, we're at (${x},${y})`);
        if (map[x][y] === 9) {
            console.log(`${getNSpace(step)}> !!! woah, found 9 at (${x},${y}) !!!`);

            if (!visited[x][y]) {
                total += 1;
                visited[x][y] = true;
            }
        }

        DIRECTIONS.forEach(([dx, dy]) => {
            if (!isInBoundary(x, y, dx, dy, map)) {
                console.log(
                    `${getNSpace(step)}> nah, step outside of boundary from (${x},${y}) to (${x + dx},${y + dy})`
                );
                return;
            }

            if (Number(map[x + dx][y + dy]) === step + 1) {
                console.log(
                    `${getNSpace(step)}> found the way, moving towards ${step + 1} from (${x},${y}) to (${x + dx},${
                        y + dy
                    })`
                );
                _M_E_G_A_O_V_E_R_9_0_0_0_R_E_C_U_R_S_I_O_N_(x + dx, y + dy, map, step + 1);
            }
        });
    }

    _M_E_G_A_O_V_E_R_9_0_0_0_R_E_C_U_R_S_I_O_N_(x, y, map, 0);

    return total;
}

function solve(input) {
    const map = input.split("\n").map((row) => row.split("").map((x) => Number(x)));
    let result = 0;

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] !== 0) {
                continue;
            }

            const score = countScoreForTrailhead(x, y, map);

            console.log(score);

            result += score;
        }
    }
    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
