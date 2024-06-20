// Invert the value of a boolean ¬
function negation(a: boolean): boolean {
  return !a
}

// And the value of two boolean ∧
function conjunction(a: boolean, b: boolean): boolean {
  return a && b
}

// Or the value of two boolean ∨
function disjunction(a: boolean, b: boolean): boolean {
  return a || b
}

// Xor the value of two boolean ⊕
function exclusiveDisjunction(a: boolean, b: boolean): boolean {
  return a !== b
}

// Imply the value of two boolean →. Conditional
function implication(a: boolean, b: boolean): boolean {
  return !a || b
}

// Equivalent the value of two boolean ≡. Biconditional
function equivalence(a: boolean, b: boolean): boolean {
  return a === b
}

// Helper function to generate all possible combinations of boolean values
function generateCombinations(variables: string[]): Record<string, boolean>[] {
  const numCombinations = Math.pow(2, variables.length)
  const combinations: Record<string, boolean>[] = []

  for (let i = 0; i < numCombinations; i++) {
    const values: Record<string, boolean> = {}
    let binaryString = i.toString(2).padStart(variables.length, '0')

    for (let j = 0; j < variables.length; j++) {
      values[variables[j]] = binaryString[j] === '1'
    }

    combinations.push(values)
  }

  return combinations
}

type Expression = (values: Record<string, boolean>) => boolean;
type TruthTable = Record<string, boolean>[];

// function generateTruthTable(expression: Expression, variables: string[]): void {
//   const combinations = generateCombinations(variables)
//
//   // Print header
//   console.log([...variables, 'Result'].join('\t'))
//
//   for (const values of combinations) {
//     const result = expression(values)
//     console.log([...Object.values(values), result].join('\t'))
//   }
// }

function generateTruthTable(expression: Expression, variables: string[]): TruthTable {
  const combinations = generateCombinations(variables);
  const truthTable: Record<string, boolean>[] = [];

  for (const values of combinations) {
    const result = expression(values);
    const row = { ...values, Result: result };
    truthTable.push(row);
  }

  return truthTable;
}

// Expression evaluates to true for all possible combinations of values
function isTautology(expression: Expression, variables: string[]): boolean {
  const combinations = generateCombinations(variables)

  for (const values of combinations) {
    const result = expression(values)
    if (!result) {
      return false
    }
  }

  return true
}

// Expression evaluates to false for all possible combinations of values
function isContradiction(expression: Expression, variables: string[]): boolean {
  const combinations = generateCombinations(variables)

  for (const values of combinations) {
    const result = expression(values)
    if (result) {
      return false
    }
  }

  return true
}

// Expression evaluates to true for some combinations of values and false for others. At least 1 true and 1 false
function isContingency(expression: Expression, variables: string[]): boolean {
  return !isTautology(expression, variables) && !isContradiction(expression, variables)
}

// Truth tables are equivalent if they have the same results for all possible combinations of values
function areEquivalent(truthTable1: TruthTable, truthTable2: TruthTable): boolean {
  for (let i = 0; i < truthTable1.length; i++) {
    if (truthTable1[i].Result !== truthTable2[i].Result) {
      return false;
    }
  }

  return true;
}

// const variables = ['p', 'q', 'r'];
// const expression = (values: Record<string, boolean>) => implication(values['p'], disjunction(values['p'], values['q']))
//
//
// generateTruthTable(
//   expression,
//   variables
// );
//
// const isTaut = isTautology(
//   expression,
//   variables
// );

// console.log(isTaut); // Outputs: true or false

function main() {
  const variables = ['p', 'q']
  const expression1 = (values: Record<string, boolean>) => disjunction(conjunction(values['p'], values['q']), conjunction(values['p'], negation(values['q'])))
  const expression2 = (values: Record<string, boolean>) => values['p']

  console.log('Expression 1: ')
  const table1 = generateTruthTable(expression1, variables)
  console.table(table1)

  console.log('Expression 2: ')
  const table2 = generateTruthTable(expression2, variables)
  console.table(table2)

  console.log('\nAre equivalent: ', areEquivalent(table1, table2))

  // console.log('\nAre equivalent: ', areEquivalent(expression1, expression2, variables))
}

main()