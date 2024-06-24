/**
 * Negates a boolean value. ¬
 *
 * @param {boolean} a - The boolean to negate.
 * @returns {boolean} The negation of the input boolean.
 */
export function negation(a: boolean): boolean {
  return !a
}

/**
 * Returns the conjunction (AND) of two boolean values. ∧
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 * @returns {boolean} The conjunction of the input booleans.
 */
export function conjunction(a: boolean, b: boolean): boolean {
  return a && b
}

/**
 * Returns the disjunction (OR) of two boolean values. ∨
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 * @returns {boolean} The disjunction of the input booleans.
 */
export function disjunction(a: boolean, b: boolean): boolean {
  return a || b
}

/**
 * Returns the exclusive disjunction (XOR) of two boolean values. ⊕
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 * @returns {boolean} The exclusive disjunction of the input booleans.
 */
export function exclusiveDisjunction(a: boolean, b: boolean): boolean {
  return a !== b
}

/**
 * Returns the implication (conditional) of two boolean values. ⇒
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 * @returns {boolean} The implication of the input booleans.
 */
export function implication(a: boolean, b: boolean): boolean {
  return !a || b
}

/**
 * Returns the equivalence (biconditional) of two boolean values. ⇔
 *
 * @param {boolean} a - The first boolean.
 * @param {boolean} b - The second boolean.
 * @returns {boolean} The equivalence of the input booleans.
 */
export function equivalence(a: boolean, b: boolean): boolean {
  return a === b
}

export type Expression = (values: Record<string, boolean>) => boolean
export type TruthTable = Record<string, boolean>[]

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

/**
 * Generates a truth table for a given logical expression.
 *
 * @param {Expression} expression - The logical expression to evaluate.
 * @param {string[]} variables - The variables in the expression.
 * @returns {TruthTable} The truth table for the expression.
 */
export function generateTruthTable(expression: Expression, variables: string[]): TruthTable {
  const combinations = generateCombinations(variables)
  const truthTable: Record<string, boolean>[] = []

  for (const values of combinations) {
    const result = expression(values)
    const row = { ...values, Result: result }
    truthTable.push(row)
  }

  return truthTable
}

/**
 * Checks if a given logical expression is a tautology.
 *
 * @param {Expression} expression - The logical expression to check.
 * @param {string[]} variables - The variables in the expression.
 * @returns {boolean} True if the expression is a tautology, false otherwise.
 */
export function isTautology(expression: Expression, variables: string[]): boolean {
  const combinations = generateCombinations(variables)

  for (const values of combinations) {
    const result = expression(values)
    if (!result) {
      return false
    }
  }

  return true
}

/**
 * Checks if a given logical expression is a contradiction.
 *
 * @param {Expression} expression - The logical expression to check.
 * @param {string[]} variables - The variables in the expression.
 * @returns {boolean} True if the expression is a contradiction, false otherwise.
 */
export function isContradiction(expression: Expression, variables: string[]): boolean {
  const combinations = generateCombinations(variables)

  for (const values of combinations) {
    const result = expression(values)
    if (result) {
      return false
    }
  }

  return true
}

/**
 * Checks if a given logical expression is a contingency.
 *
 * @param {Expression} expression - The logical expression to check.
 * @param {string[]} variables - The variables in the expression.
 * @returns {boolean} True if the expression is a contingency, false otherwise.
 */
export function isContingency(expression: Expression, variables: string[]): boolean {
  return !isTautology(expression, variables) && !isContradiction(expression, variables)
}

/**
 * Checks if two truth tables are equivalent.
 *
 * @param {TruthTable} truthTable1 - The first truth table.
 * @param {TruthTable} truthTable2 - The second truth table.
 * @returns {boolean} True if the truth tables are equivalent, false otherwise.
 */
export function areEquivalent(truthTable1: TruthTable, truthTable2: TruthTable): boolean {
  for (let i = 0; i < truthTable1.length; i++) {
    if (truthTable1[i].Result !== truthTable2[i].Result) {
      return false
    }
  }

  return true
}