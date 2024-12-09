const { readInput, writeOutput } = require("../../utils");

function solve(input) {
    let data = [];

    let id = 0;
    for (let index = 0; index < input.length; index++) {
        const char = input[index];

        if (index % 2 === 0) {
            data.push({ data: new Array(Number(char)).fill(char).join(""), id });
            id++;
        } else {
            if (char !== "0") {
                data.push({ data: new Array(Number(char)).fill(".").join(""), id: -1 });
            }
        }
    }

    let rightIndex = data.length - 1;

    while (rightIndex >= 0) {
        if (data[rightIndex].id === -1) {
            rightIndex--;
        } else {
            const placeToPasteIndex = data.findIndex(
                (value) => value.id === -1 && value.data.length >= data[rightIndex].data.length
            );

            if (placeToPasteIndex === -1 || placeToPasteIndex >= rightIndex) {
                rightIndex--;
                continue;
            }

            const restSpace = new Array(data[placeToPasteIndex].data.length - data[rightIndex].data.length)
                .fill(".")
                .join("");
            data[placeToPasteIndex] = data[rightIndex];
            data[rightIndex] = { data: new Array(data[rightIndex].data.length).fill(".").join(""), id: -1 };

            if (restSpace.length) {
                data.splice(placeToPasteIndex + 1, 0, { data: restSpace, id: -1 });
            }
        }
    }

    const result = data
        .map(({ data, id }) => new Array(data.length).fill(id === -1 ? "." : id))
        .flat(2)
        .reduce((total, id, index) => (id === "." ? total : total + id * index));

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
