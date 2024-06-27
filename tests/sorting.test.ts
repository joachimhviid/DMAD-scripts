import { test } from 'bun:test'
import { countingSort, partition } from '@datastructures'

test('counting sort', () => {
  const arr = [2,0,6,2,3,5,5,1,2]
  const { output, count } = countingSort(arr)
  console.log('Output:', output)
  console.log('Count:', count)

  console.log('Sum of count array:', count.reduce((acc, val) => acc + val, 0))
})

test('partioning', () => {
  const array = [21, 17, 28, 14, 9, 18, 6, 1, 26, 15, 30, 7, 13, 19, 2]
  const pivotIndex = partition(array, 3, 12)
  console.log('Partitioned array:', array)
  console.log('Pivot index:', pivotIndex)
})