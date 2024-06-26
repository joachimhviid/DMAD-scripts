import { test } from 'bun:test'
import { validPositionsForKey } from '@datastructures'

test('assignment', () => {
  // const heap = [3, 5, 6, 10, 11, 8, 7, 18, 16, 15]
  // const min = extractMin(heap)
  // console.log(heap, min)

  const keys = [1,2,3,4,5]
  const keyToFit = 4
  const validPositions = validPositionsForKey(keys, keyToFit, 'max')
  console.log(validPositions)
})