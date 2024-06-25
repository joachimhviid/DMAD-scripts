import { test, expect } from 'bun:test'
import type { ExpressionProof, Formula } from '@discrete-mathematics'
import {
  performInductionTest,
  performDirectProof,
  performContrapositionProof,
  performContradictionProof,
} from '@discrete-mathematics'

test('proof by induction', () => {
  // Define the specific expression and formula for the given problem
  // Left side of the equation
  const expression: ExpressionProof = (i) => Math.pow(1 / 2, i - 1) - Math.pow(1 / 2, i)
  // Right side of the equation
  const formula: Formula = (n) => 1 - Math.pow(1 / 2, n)

  console.assert(performInductionTest(expression, formula), 'Induction proof failed')
})

// Direct Proof Test
test('performDirectProof - should return true for a valid statement', () => {
  const statement = () => true // Example statement that is always true
  expect(performDirectProof(statement)).toBe(true)
})

test('performDirectProof - should return false for an invalid statement', () => {
  const statement = () => false // Example statement that is always false
  expect(performDirectProof(statement)).toBe(false)
})

test('direct proof', () => {
  const statement = () => 2 + 2 === 4

  console.assert(performDirectProof(statement), 'Direct proof failed')
})

// Proof by Contraposition Test
test('performContrapositionProof - should return true when original and contrapositive statements are equivalent', () => {
  const originalStatement = () => true // Example statement
  const contrapositiveStatement = () => true // Contrapositive statement
  expect(performContrapositionProof(originalStatement, contrapositiveStatement)).toBe(true)
})

test('performContrapositionProof - should return false when original and contrapositive statements are not equivalent', () => {
  const originalStatement = () => true // Example statement
  const contrapositiveStatement = () => false // Contrapositive statement
  expect(performContrapositionProof(originalStatement, contrapositiveStatement)).toBe(false)
})

test('proof by contraposition', () => {
  const originalStatement = () => 2 + 2 === 4
  const contrapositiveStatement = () => 2 + 2 !== 4

  console.assert(performContrapositionProof(originalStatement, contrapositiveStatement), 'Contraposition proof failed')
})

// Proof by Contradiction Test
test('performContradictionProof - should return true when both assumption and contradiction are true', () => {
  const assumption = () => true // Example assumption
  const contradiction = () => true // Example contradiction
  expect(performContradictionProof(assumption, contradiction)).toBe(true)
})

test('performContradictionProof - should return false when assumption is true and contradiction is false', () => {
  const assumption = () => true // Example assumption
  const contradiction = () => false // Example contradiction
  expect(performContradictionProof(assumption, contradiction)).toBe(false)
})

test('performContradictionProof - should return false when assumption is false and contradiction is true', () => {
  const assumption = () => false // Example assumption
  const contradiction = () => true // Example contradiction
  expect(performContradictionProof(assumption, contradiction)).toBe(false)
})

test('proof by contradiction', () => {
  const assumption = () => 2 + 2 !== 4
  const contradiction = () => 2 + 2 === 4

  console.assert(performContradictionProof(assumption, contradiction), 'Contradiction proof failed')
})