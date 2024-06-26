import { test } from 'bun:test'
import type { HashTable } from '@datastructures'
import { findValidH2Values } from '@datastructures'

test('assignment', () => {
  const initialTable: HashTable = [13, 56, null, 32, 91, null, 82, null]
  const insertedValue = 25
  const desiredIndex = 5
  const possibleH2Values = findValidH2Values(initialTable, insertedValue, desiredIndex, (x) => 3)
  console.log(possibleH2Values)
  // expect(possibleH2Values).toEqual([1, 2, 3, 4, 5])
})