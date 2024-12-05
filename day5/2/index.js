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

    const invalidBatches = batches.filter((batch) => {
        return !batch.every((page, index) => {
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

            return result;
        });
    });

    console.log(rules, batches);

    const validBatches = invalidBatches.map((batch) => {
        const newBatch = [...batch];

        for (let i = 0; i < newBatch.length; i++) {
            for (let j = 0; j < newBatch.length; j++) {
                if (i === j) {
                    continue;
                }

                const firstPage = newBatch[i];
                const secondPage = newBatch[j];

                if (!rules[firstPage]) {
                    continue;
                }

                const hasRule = rules[firstPage].includes(secondPage);
                const indexOrderCorrect =
                    newBatch.findIndex((i) => i === firstPage) < newBatch.findIndex((i) => i === secondPage);

                if (hasRule) {
                    if (indexOrderCorrect) {
                        continue;
                    } else {
                        newBatch[i] = secondPage;
                        newBatch[j] = firstPage;
                    }
                }
            }
        }

        return newBatch;
    });

    console.log(validBatches);

    const result = validBatches.reduce((total, batch) => total + Number(batch[Math.round((batch.length - 1) / 2)]), 0);

    return result;
}

const inputData = readInput();
const outputData = solve(inputData);
writeOutput(outputData);
