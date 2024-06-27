import { buildMaxHeap, extractMax } from './structures.ts'

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

export function partition(A: number[], p: number, r: number): number {
  let x = A[r]        // the pivot
  let i = p - 1       // highest index into the low side

  for (let j = p; j <= r - 1; j++) {    // process each element other than the pivot
    if (A[j] <= x) { // does this element belong on the low side?
      i = i + 1;  // index of a new slot in the low side
      [A[i], A[j]] = [A[j], A[i]] // put this element there (swap)
    }
  }
  [A[i + 1], A[r]] = [A[r], A[i + 1]]  // pivot goes just to the right of the low side (swap)
  return i + 1       // new index of the pivot
}

// Quicksort
export function quicksort(A: number[], p: number, r: number): void {
  if (p < r) {
    // partition the array into two parts around the pivot
    let q = partition(A, p, r)
    quicksort(A, p, q - 1) // sort the low side
    quicksort(A, q + 1, r) // sort the high side
  }
}

export function insertionSort(A: number[]): number[] {
  const n = A.length

  for (let i = 1; i < n; i++) {
    const key = A[i] // Element to be inserted
    let j = i - 1

    // Move elements of A[0..i-1], that are greater than key, to one position ahead of their current position
    while (j >= 0 && A[j] > key) {
      A[j + 1] = A[j]
      j = j - 1
    }

    // Insert the key at after the element just smaller than it.
    A[j + 1] = key
  }

  return A
}

export function mergeSort(A: number[], p: number, r: number): void {
  if (p >= r) {
    return
  }
  const q = Math.floor((p + r) / 2)
  mergeSort(A, p, q)
  mergeSort(A, q + 1, r)
  merge(A, p, q, r)
}

function merge(A: number[], p: number, q: number, r: number): void {
  const nL = q - p + 1
  const nR = r - q
  const L = new Array(nL)
  const R = new Array(nR)

  for (let i = 0; i < nL; i++) {
    L[i] = A[p + i]
  }
  for (let j = 0; j < nR; j++) {
    R[j] = A[q + 1 + j]
  }

  let i = 0
  let j = 0
  let k = p

  while (i < nL && j < nR) {
    if (L[i] <= R[j]) {
      A[k] = L[i]
      i++
    } else {
      A[k] = R[j]
      j++
    }
    k++
  }

  while (i < nL) {
    A[k] = L[i]
    i++
    k++
  }

  while (j < nR) {
    A[k] = R[j]
    j++
    k++
  }
}

export function selectionSort(input: number[]): number[] {
  const n = input.length
  const output: number[] = []

  while (input.length > 0) {
    // Find the index of the minimum element in the input list
    let minIndex = 0
    for (let i = 1; i < input.length; i++) {
      if (input[i] < input[minIndex]) {
        minIndex = i
      }
    }

    // Move the minimum element to the end of the output list
    const minElement = input.splice(minIndex, 1)[0]
    output.push(minElement)
  }

  return output
}

function countingSortForRadix(arr: number[], exp: number): CountingSortOutput {
  let n = arr.length
  let output = new Array(n).fill(0)
  let count = new Array(10).fill(0) // Since digits are in range 0-9

  // Count the occurrences of each digit in the given place (exp)
  for (let i = 0; i < n; i++) {
    let index = Math.floor(arr[i] / exp) % 10
    count[index]++
  }

  // Update the count array to reflect the actual position of each digit in the output array
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1]
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    let index = Math.floor(arr[i] / exp) % 10
    output[--count[index]] = arr[i]
  }

  // Copy the output array to arr, so that arr now contains sorted numbers according to current digit
  for (let i = 0; i < n; i++) {
    arr[i] = output[i]
  }

  return { output, count }
}

export function heapSort(input: number[]): number[] {
  // Build a max heap from the input array
  let heap = buildMaxHeap(input)
  const n = heap.length
  const output: number[] = new Array(n)

  // Extract the maximum element from the heap and insert it at the end of the sorted array
  for (let i = n - 1; i >= 0; i--) {
    output[i] = extractMax(heap)!
  }

  return output
}

export function radixSort(arr: number[]): void {
  // Find the maximum number to know the number of digits
  const max = Math.max(...arr)

  // Do counting sort for every digit. Note that instead of passing digit number, exp is passed.
  // exp is 10^i where i is the current digit number
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(arr, exp)
  }
}

// Example usage
// const array = [170, 45, 75, 90, 802, 24, 2, 66];
// console.log("Original array:", array);
// radixSort(array);
// console.log("Sorted array:", array);