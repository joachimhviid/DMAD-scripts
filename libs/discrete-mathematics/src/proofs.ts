/**
 * Type for an expression function representing individual terms of a summation.
 * @callback Expression
 * @param {number} i - The index of the term in the summation.
 * @returns {number} The result of the expression for the given index.
 */
export type ExpressionProof = (i: number) => number

/**
 * Type for a formula function representing the right-hand side of the equation.
 * @callback Formula
 * @param {number} n - The parameter (usually the upper bound of the summation).
 * @returns {number} The result of the formula for the given parameter.
 */
export type Formula = (n: number) => number

/**
 * Verifies the base case for a given expression and formula.
 * @param {Expression} expression - The expression function.
 * @param {Formula} formula - The formula function.
 * @returns {boolean} True if the base case holds, otherwise false.
 */
function verifyBaseCase(expression: ExpressionProof, formula: Formula): boolean {
  const n = 1
  let leftSide = 0
  for (let i = 1; i <= n; i++) {
    leftSide += expression(i)
  }
  const rightSide = formula(n)
  return leftSide === rightSide
}

/**
 * Verifies the inductive step for a given expression and formula.
 * @param {Expression} expression - The expression function.
 * @param {Formula} formula - The formula function.
 * @param {number} k - The parameter for the inductive step.
 * @returns {boolean} True if the inductive step holds, otherwise false.
 */
function verifyInductiveStep(expression: ExpressionProof, formula: Formula, k: number): boolean {
  let leftSide = 0
  for (let i = 1; i <= k; i++) {
    leftSide += expression(i)
  }

  leftSide += expression(k + 1)
  const rightSide = formula(k + 1)

  return leftSide === rightSide
}

/**
 * Performs the induction test for a given expression and formula.
 * @param {Expression} expression - The expression function.
 * @param {Formula} formula - The formula function.
 * @returns {boolean} True if the induction test passes for a range of values, otherwise false.
 */
export function performInductionTest(expression: ExpressionProof, formula: Formula): boolean {
  // Verify base case
  const baseCase = verifyBaseCase(expression, formula)
  if (!baseCase) {
    return false
  }

  // Verify inductive step for several values of k
  for (let k = 1; k <= 10; k++) {
    if (!verifyInductiveStep(expression, formula, k)) {
      return false
    }
    console.log(`Inductive step verified for k = ${k}`)
  }

  return true
}

/**
 * Performs a direct proof.
 * @param {Function} statement - The statement function that returns a boolean.
 * @returns {boolean} True if the direct proof holds (i.e., the statement is true), otherwise false.
 */
export function performDirectProof(statement: () => boolean): boolean {
  // If the statement is true, then the direct proof holds
  return statement()
}

/**
 * Performs a proof by contraposition.
 * @param {Function} originalStatement - The original statement function that returns a boolean.
 * @param {Function} contrapositiveStatement - The contrapositive statement function that returns a boolean.
 * @returns {boolean} True if the proof by contraposition holds, otherwise false.
 */
export function performContrapositionProof(originalStatement: () => boolean, contrapositiveStatement: () => boolean): boolean {
  // If the original statement and the contrapositive statement both return the same result, then the proof by contraposition holds
  return originalStatement() === contrapositiveStatement()
}

/**
 * Performs a proof by contradiction.
 * @param {Function} assumption - The assumption function that returns a boolean.
 * @param {Function} contradiction - The contradiction function that returns a boolean.
 * @returns {boolean} True if the proof by contradiction holds, otherwise false.
 */
export function performContradictionProof(assumption: () => boolean, contradiction: () => boolean): boolean {
  // If the assumption is true and the contradiction is also true, then the proof by contradiction holds
  return assumption() && contradiction()
}
