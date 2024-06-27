import { test } from 'bun:test'
import { countingSort } from '@datastructures'

test('counting sort', () => {
  const arr = [2,0,6,2,3,5,5,1,2]
  const { output, count } = countingSort(arr)
  console.log('Output:', output)
  console.log('Count:', count)

  console.log('Sum of count array:', count.reduce((acc, val) => acc + val, 0))
})