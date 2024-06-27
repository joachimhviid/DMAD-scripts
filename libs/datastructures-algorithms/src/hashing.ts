export type HashTable = (number | null)[]
export type HashFunction = (x: number) => number

// Hash function as given in the problem
// function h1(x: number): number {
//   switch (x) {
//     case 22:
//       return 6
//     case 33:
//       return 1
//     case 44:
//       return 4
//     case 55:
//       return 1
//     case 66:
//       return 6
//     case 77:
//       return 1
//     default:
//       throw new Error('Unknown input')
//   }
// }

export function tryInsertWithLinearProbing(table: HashTable, values: number[], hashFunction: HashFunction): HashTable {
  const tableCopy = [...table]
  for (const value of values) {
    console.log('Inserting:', value)
    let index = hashFunction(value)
    while (tableCopy[index] !== null) {
      index = (index + 1) % tableCopy.length
    }
    tableCopy[index] = value
    console.log('Table after inserting:', tableCopy)
  }
  return tableCopy
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

export function findValidH2Values(initialTable: HashTable, insertedValue: number, desiredIndex: number, h1Function: HashFunction): number[] {
// Function to check if a particular h2 is valid
  function isValidH2(h2: number): boolean {
    const table: HashTable = [...initialTable]
    const startIdx = h1Function(insertedValue)

    for (let i = 0; i < table.length; i++) {
      const idx = (startIdx + i * h2) % table.length
      if (table[idx] === null) {
        table[idx] = insertedValue
        break
      }
    }

    return table[desiredIndex] === insertedValue
  }

  // Check all possible h2 values
  const possibleH2Values: number[] = []
  for (let h2 = 0; h2 < initialTable.length; h2++) {
    if (isValidH2(h2)) {
      possibleH2Values.push(h2)
    }
  }

  return possibleH2Values
}

export function findPossibleIndices(initialTable: HashTable, finalTable: HashTable, insertedValue: number): number[] {
  // Function to simulate the insertion process using a given hash function
  function insertWithHashFunction(table: HashTable, value: number, hashFunction: HashFunction): number {
    let index = hashFunction(value)
    while (table[index] !== null) {
      index = (index + 1) % table.length
    }
    table[index] = value
    return index
  }

  // Function to check if a particular hash function is valid
  function isValidHashFunction(hashFunction: HashFunction): boolean {
    const table: HashTable = [...initialTable]
    insertWithHashFunction(table, insertedValue, hashFunction)
    return table.every((val, i) => val === finalTable[i])
  }

  // Check all possible hash functions
  const possibleIndices: number[] = []
  for (let i = 0; i < initialTable.length; i++) {
    const hashFunction: HashFunction = (x) => (x + i) % initialTable.length
    if (isValidHashFunction(hashFunction)) {
      const index = insertWithHashFunction([...initialTable], insertedValue, hashFunction)
      possibleIndices.push(index)
    }
  }

  return possibleIndices
}
