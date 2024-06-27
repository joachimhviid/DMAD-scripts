type CountingSortOutput = {
  output: number[]
  count: number[]
}

export function countingSort(arr: number[]): CountingSortOutput {
  let max = Math.max(...arr)
  let count = new Array(max + 1).fill(0)
  let output = new Array(arr.length)

  // Count the occurrence of each number in the array
  for (let num of arr) {
    count[num]++
  }

  // Update the count array to reflect the actual position of each number in the output array
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1]
  }

  // Build the output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i]]] = arr[i]
  }

  return { output, count }
}