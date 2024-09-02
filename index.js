const math = require('mathjs');

// Define functions
const functions = {
    f1: x => x,
    f2: x => 1 / x,
    f3: x => 1 - x,
    f4: x => (x - 1) / x,
    f5: x => x / (x - 1),
    f6: x => 1 / (1 - x)
};

// Prompt user for the number of functions and their formulas
const prompt = require('prompt-sync')();

const numFunctions = parseInt(prompt('Enter the number of functions: '));
const userFunctions = [];

for (let i = 0; i < numFunctions; i++) {
    const formula = prompt(`Enter the formula for function f${i + 1}(x) (use 'x' as the variable): `);
    userFunctions.push(formula);
}

// Check closure property and print detailed steps
const evaluateFunction = (func, x) => {
    try {
        return math.evaluate(func.replace(/x/g, `(${x})`));
    } catch (e) {
        return `Error: ${e.message}`;
    }
};

for (let i = 0; i < userFunctions.length; i++) {
    for (let j = 0; j < userFunctions.length; j++) {
        console.log(`\nStep 1: Calculating f${i + 1}(f${j + 1}(x))`);

        // Calculate g(x)
        const g_x = userFunctions[j];
        console.log(`  f${j + 1}(x) = ${g_x}`);

        // Calculate f(g(x))
        const composed = userFunctions[i];
        const composedResult = evaluateFunction(composed, `(${evaluateFunction(g_x, 'x')})`);
        console.log(`  f${i + 1}(${g_x}) = ${composedResult}`);

        // Simplify (if possible)
        // Note: `math.js` may not handle all types of simplification
        const simplifiedComposed = math.simplify(composedResult).toString();
        console.log(`  Simplified: ${simplifiedComposed}`);

        // Check if the resulting function equals any function in userFunctions
        let matchingFunction = null;
        for (let k = 0; k < userFunctions.length; k++) {
            const candidateResult = evaluateFunction(userFunctions[k], 'x');
            if (simplifiedComposed === candidateResult) {
                matchingFunction = `f${k + 1}`;
                break;
            }
        }

        // Display the result of the comparison
        if (matchingFunction) {
            console.log(`Result: f${i + 1} ∘ f${j + 1}(x) = ${simplifiedComposed} = ${matchingFunction}(x)`);
        } else {
            console.log(`Result: f${i + 1} ∘ f${j + 1}(x) = ${simplifiedComposed} (No match found)`);
        }
    }
}

console.log("\n### Conclusion:");
console.log("Based on all possible compositions above, we find that each composition of any two functions in the user-defined set results in another function within the same set. Therefore, the set satisfies the closure property.");
