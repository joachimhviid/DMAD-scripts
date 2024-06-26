export type HashTable = (number | null)[]
export type HashFunction = (x: number) => number

// Hash function as given in the problem
function h1(x: number): number {
  switch (x) {
    case 22:
      return 6
    case 33:
      return 1
    case 44:
      return 4
    case 55:
      return 1
    case 66:
      return 6
    case 77:
      return 1
    default:
      throw new Error('Unknown input')
  }
}

// Function to simulate the insertion process using linear probing
function insertWithLinearProbing(table: HashTable, values: number[], hashFunction: HashFunction): HashTable {
  for (const value of values) {
    console.log('Inserting:', value)
    let index = hashFunction(value)
    while (table[index] !== null) {
      index = (index + 1) % table.length
    }
    table[index] = value
    console.log('Table after inserting:', table)
  }
  return table
}

// Function to check which values could have been inserted first
// export function findFirstInsertedValues(): number[] {
export function findFirstInsertedValues(values: number[], tableSize: number, finalTable: HashTable, hashFunction: HashFunction): number[] {
  // const values = [22, 33, 44, 55, 66, 77]
  // const tableSize = 7
  // const finalTable: HashTable = [22, 77, 55, 33, 44, null, 66]
  const possibleFirstInserts: number[] = []

  for (const value of values) {
    // console.log('Value:', value)
    // Create an empty hash table
    const table: HashTable = new Array(tableSize).fill(null)
    // Insert the current value first
    insertWithLinearProbing(table, [value], hashFunction)
    // console.log('Table after inserting value:', table)
    // Insert the remaining values
    insertWithLinearProbing(table, values.filter(v => v !== value), hashFunction)
    console.log('Final table:', table)

    if (table.every((val, i) => val === finalTable[i])) {
      possibleFirstInserts.push(value)
    }
  }

  return possibleFirstInserts
}

export function findInsertionOrders(values: number[], tableSize: number, finalTable: HashTable, hashFunction: HashFunction): number[][] {
  const possibleInsertionOrders: number[][] = []

  function generatePermutations(arr: number[], start: number, end: number) {
    if (start === end) {
      const table: HashTable = new Array(tableSize).fill(null)
      insertWithLinearProbing(table, arr, hashFunction)
      if (table.every((val, i) => val === finalTable[i])) {
        possibleInsertionOrders.push(arr.slice())
      }
    } else {
      for (let i = start; i <= end; i++) {
        [arr[start], arr[i]] = [arr[i], arr[start]]
        // @ts-ignore
        generatePermutations(arr, start + 1, end);
        [arr[start], arr[i]] = [arr[i], arr[start]] // swap back
      }
    }
  }

  generatePermutations(values, 0, values.length - 1)
  return possibleInsertionOrders
}