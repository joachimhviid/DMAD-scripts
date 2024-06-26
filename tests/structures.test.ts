import { test } from 'bun:test'
import { validPositionsForKey, extractMin } from '@datastructures'

test('find valid position for a set of keys in a min or max heap', () => {
  const keys = [1,2,3,4,5]
  const keyToFit = 4
  const validPositions = validPositionsForKey(keys, keyToFit, 'max')
  console.log(validPositions)
})

test('get heap after performing extraction to see new positions', () => {
  const heap = [3, 5, 6, 10, 11, 8, 7, 18, 16, 15]
  const min = extractMin(heap)
  console.log(heap, min)
})