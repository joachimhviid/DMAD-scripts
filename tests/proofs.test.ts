import { test } from 'bun:test'
import type { ExpressionProof, Formula } from '@discrete-mathematics'
import { performInductionTest } from '@discrete-mathematics'

test('proof by induction', () => {
  // Define the specific expression and formula for the given problem
  const expression: ExpressionProof = (i) => Math.pow(1 / 2, i - 1) - Math.pow(1 / 2, i)
  const formula: Formula = (n) => 1 - Math.pow(1 / 2, n)

  // Perform the induction test
  console.log(performInductionTest(expression, formula))
})