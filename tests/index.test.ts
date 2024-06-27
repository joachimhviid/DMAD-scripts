import { test } from 'bun:test'
import {
  areEquivalent,
  conjunction,
  disjunction,
  equivalence,
  generateTruthTable,
  implication,
  negation,
} from '@discrete-mathematics'
import { buildMaxHeap, buildMaxHeapWithInsertion } from '@datastructures'

test('assignment', () => {
  const heap = buildMaxHeapWithInsertion([6,12,13,4,8,14,5])
  console.log(heap)
})