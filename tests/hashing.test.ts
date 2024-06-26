import { test } from 'bun:test'
import { findInsertionOrders, findValidH2Values, type HashTable } from '@datastructures'

test('find valid first insertion into hash table', () => {
  const h1 = (x: number): number => {
    switch (x) {
      case 22: return 6;
      case 33: return 1;
      case 44: return 4;
      case 55: return 1;
      case 66: return 6;
      case 77: return 1;
      default: throw new Error("Unknown input");
    }
  }
  const values = [22, 33, 44, 55, 66, 77]
  const tableSize = 7
  const finalTable = [22, 77, 55, 33, 44, null, 66]
  // const possibleFirstInserts = findFirstInsertedValues(values, tableSize, finalTable, h1)
  // const possibleFirstInserts = findFirstInsertedValues()
  // console.log(possibleFirstInserts)

  // expect(possibleFirstInserts.sort()).toEqual([44, 66, 77].sort())

  const insertionOrders = findInsertionOrders(values, tableSize, finalTable, h1)
  console.log('First inserts', insertionOrders.map((order) => order[0]))
})

test('find valid h2 value given h1 (double hashing)', () => {
  const initialTable: HashTable = [13, 56, null, 32, 91, null, 82, null]
  const insertedValue = 25
  const desiredIndex = 5
  const possibleH2Values = findValidH2Values(initialTable, insertedValue, desiredIndex, (x) => 3)
  console.log(possibleH2Values)
  // expect(possibleH2Values).toEqual([1, 2, 3, 4, 5])
})