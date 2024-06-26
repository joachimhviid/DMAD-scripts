// Heaps

function minHeapify(heap: number[], i: number): void {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let smallest = i

  if (left < heap.length && heap[left] < heap[smallest]) {
    smallest = left
  }

  if (right < heap.length && heap[right] < heap[smallest]) {
    smallest = right
  }

  if (smallest !== i) {
    [heap[i], heap[smallest]] = [heap[smallest], heap[i]]
    minHeapify(heap, smallest)
  }
}

export function extractMin(heap: number[]): number | null {
  if (heap.length === 0) return null

  const min = heap[0]
  heap[0] = heap[heap.length - 1]
  heap.pop()

  minHeapify(heap, 0)

  return min
}

function maxHeapify(heap: number[], i: number): void {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let largest = i

  if (left < heap.length && heap[left] > heap[largest]) {
    largest = left
  }

  if (right < heap.length && heap[right] > heap[largest]) {
    largest = right
  }

  if (largest !== i) {
    [heap[i], heap[largest]] = [heap[largest], heap[i]]
    maxHeapify(heap, largest)
  }
}

export function extractMax(heap: number[]): number | null {
  if (heap.length === 0) return null

  const max = heap[0]
  heap[0] = heap[heap.length - 1]
  heap.pop()

  maxHeapify(heap, 0)

  return max
}

/**
 * Generates all possible min-heaps for a given set of keys.
 *
 * @param {number[]} keys - The set of keys.
 * @returns {number[][]} - Array of all possible min-heaps.
 */
export function generateMinHeaps(keys: number[]): number[][] {
  const heaps: number[][] = []

  function permute(arr: number[], l: number, r: number) {
    if (l === r) {
      const heap = arr.slice()
      for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        minHeapify(heap, i)
      }
      heaps.push(heap)
    } else {
      for (let i = l; i <= r; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]]
        permute(arr, l + 1, r);
        [arr[l], arr[i]] = [arr[i], arr[l]]
      }
    }
  }

  permute(keys, 0, keys.length - 1)
  return heaps
}

/**
 * Generates all possible max-heaps for a given set of keys.
 *
 * @param {number[]} keys - The set of keys.
 * @returns {number[][]} - Array of all possible max-heaps.
 */
export function generateMaxHeaps(keys: number[]): number[][] {
  const heaps: number[][] = []

  function permute(arr: number[], l: number, r: number) {
    if (l === r) {
      const heap = arr.slice()
      for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        maxHeapify(heap, i)
      }
      heaps.push(heap)
    } else {
      for (let i = l; i <= r; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]]
        permute(arr, l + 1, r);
        [arr[l], arr[i]] = [arr[i], arr[l]]
      }
    }
  }

  permute(keys, 0, keys.length - 1)
  return heaps
}

type HeapType = 'min' | 'max'

/**
 * Determines all valid positions for the key in a min-heap.
 *
 * @param {number[]} keys - The set of keys.
 * @param {number} key - The key to place.
 * @param heapType - The type of heap to generate.
 * @returns {number[]} - Array of valid positions for the key.
 */
export function validPositionsForKey(keys: number[], key: number, heapType: HeapType): number[] {
  const heaps = heapType === 'min' ? generateMinHeaps(keys) : generateMaxHeaps(keys)
  const positions = new Set<number>()

  heaps.forEach(heap => {
    heap.forEach((value, index) => {
      if (value === key) {
        positions.add(index + 1) // Convert to 1-based index
      }
    })
  })

  return Array.from(positions).sort((a, b) => a - b)
}