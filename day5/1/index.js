const { readInput, writeOutput } = require("../../utils");

function solve(input) {
    const [rawRules, rawBatches] = input.split("\n\n");
    const rules = rawRules.split("\n").reduce((acc, rule) => {
        const [X, Y] = rule.split("|");
        acc[X] ??= [];
        acc[X].push(Y);

        return acc;
    }, {});
    const batches = rawBatches.split("\n").map((batch) => batch.split(","));

    const validBatches = batches.filter((batch) => {
        return batch.every((page, index) => {
            const rulesForPage = rules[page];

            if (!rulesForPage) {
                return true;
            }

            const pageIndexes = batch.reduce((acc, batchPage, batchPageIndex) => {
                if (page === batchPage) {
                    return acc;
                }

                if (rulesForPage.includes(batchPage)) {
                    acc.push(batchPageIndex);
                }

                return acc;
            }, []);

            const result = pageIndexes.every((pageIndex) => index <= pageIndex);

            console.log(batch, page, rulesForPage, pageIndexes, result);

            return result;
        });
    });

    const result = validBatches.reduce((total, batch) => total + Number(batch[Math.round((batch.length - 1) / 2)]), 0);

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
