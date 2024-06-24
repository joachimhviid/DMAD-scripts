export type Relation = [string, string][]

/**
 * Checks if a given relation is reflexive.
 *
 * A relation R on a set A is said to be reflexive if for every a in A, there is a (a, a) in R.
 *
 * @param {Relation} relation - The relation to check.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {boolean} Returns true if the relation is reflexive, and false otherwise.
 */
export function isReflexive(relation: Relation, elements: string[]): boolean {
  for (const element of elements) {
    if (!relation.some(([a, b]) => a === element && b === element)) {
      return false
    }
  }
  return true
}

/**
 * Checks if a given relation is symmetric.
 *
 * A relation R on a set A is said to be symmetric if for every (a, b) in R, there is a (b, a) in R.
 *
 * @param {Relation} relation - The relation to check. This is an array of tuples, where each tuple represents a pair (a, b) in the relation.
 * @returns {boolean} Returns true if the relation is symmetric, and false otherwise.
 */
export function isSymmetric(relation: Relation): boolean {
  for (let [a, b] of relation) {
    if (!relation.some(([x, y]) => x === b && y === a)) {
      return false
    }
  }
  return true
}

/**
 * Checks if a given relation is anti-symmetric.
 *
 * A relation R on a set A is said to be anti-symmetric if for every (a, b) in R where a ≠ b, there is no (b, a) in R.
 *
 * @param {Relation} relation - The relation to check. This is an array of tuples, where each tuple represents a pair (a, b) in the relation.
 * @returns {boolean} Returns true if the relation is anti-symmetric, and false otherwise.
 */
export function isAntiSymmetric(relation: Relation): boolean {
  for (let [a, b] of relation) {
    if (a !== b && relation.some(([x, y]) => x === b && y === a)) {
      return false
    }
  }
  return true
}

/**
 * Checks if a given relation is transitive.
 *
 * A relation R on a set A is said to be transitive if for every (a, b) in R and (b, c) in R, there is a (a, c) in R.
 *
 * @param {Relation} relation - The relation to check. This is an array of tuples, where each tuple represents a pair (a, b) in the relation.
 * @returns {boolean} Returns true if the relation is transitive, and false otherwise.
 */
export function isTransitive(relation: Relation): boolean {
  for (let [a, b] of relation) {
    for (let [x, y] of relation) {
      if (b === x && !relation.some(([i, j]) => i === a && j === y)) {
        return false
      }
    }
  }
  return true
}

/**
 * Checks if a given relation is a partial order.
 *
 * A relation R on a set A is said to be a partial order if it is reflexive, antisymmetric, and transitive.
 *
 * @param {Relation} relation - The relation to check.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {boolean} Returns true if the relation is a partial order, and false otherwise.
 */
export function isPartialOrder(relation: Relation, elements: string[]): boolean {
  return isReflexive(relation, elements) && isAntiSymmetric(relation) && isTransitive(relation)
}

/**
 * Checks if a given relation is an equivalence relation.
 *
 * A relation R on a set A is said to be an equivalence relation if it is reflexive, symmetric, and transitive.
 *
 * @param {Relation} relation - The relation to check.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {boolean} Returns true if the relation is an equivalence relation, and false otherwise.
 */
export function isEquivalence(relation: Relation, elements: string[]): boolean {
  return isReflexive(relation, elements) && isSymmetric(relation) && isTransitive(relation)
}

/**
 * Computes the reflexive closure of a relation.
 *
 * The reflexive closure of a relation R on a set A is the smallest relation that contains R and is reflexive.
 *
 * @param {Relation} relation - The relation to compute the reflexive closure of.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {Relation} The reflexive closure of the relation.
 */
export function reflexiveClosure(relation: Relation, elements: string[]): Relation {
  const closure: Relation = [...relation] // Copy the relation

  for (const element of elements) {
    if (!closure.some(([a, b]) => a === element && b === element)) {
      closure.push([element, element])
    }
  }

  return closure
}

/**
 * Computes the symmetric closure of a relation.
 *
 * The symmetric closure of a relation R is the smallest relation that contains R and is symmetric.
 *
 * @param {Relation} relation - The relation to compute the symmetric closure of.
 * @returns {Relation} The symmetric closure of the relation.
 */
export function symmetricClosure(relation: Relation): Relation {
  const closure: Relation = [...relation] // Copy the relation

  for (const [a, b] of relation) {
    if (!closure.some(([x, y]) => x === b && y === a)) {
      closure.push([b, a])
    }
  }

  return closure
}

/**
 * Computes the transitive closure of a relation using Warshall's algorithm.
 *
 * The relation is represented as an adjacency matrix, where matrix[i][j] is true if and only if (i, j) is in the relation.
 *
 * @param {boolean[][]} matrix - The adjacency matrix representing the relation.
 * @returns {boolean[][]} The adjacency matrix representing the transitive closure of the relation.
 */
export function transitiveClosure(matrix: boolean[][]): boolean[][] {
  const n = matrix.length
  const closure = [...matrix].map(row => [...row]) // Copy the matrix

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        closure[i][j] = closure[i][j] || (closure[i][k] && closure[k][j])
      }
    }
  }

  return closure
}

/**
 * Converts a relation to an adjacency matrix.
 *
 * @param {Relation} relation - The relation to convert. This is an array of tuples, where each tuple represents a pair (a, b) in the relation.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {boolean[][]} The adjacency matrix representing the relation.
 */
export function relationToMatrix(relation: Relation, elements: string[]): boolean[][] {
  const n = elements.length
  const matrix: boolean[][] = Array(n).fill(0).map(() => Array(n).fill(false))

  for (let [a, b] of relation) {
    const i = elements.indexOf(a)
    const j = elements.indexOf(b)
    if (i !== -1 && j !== -1) {
      matrix[i][j] = true
    }
  }

  return matrix
}

/**
 * Converts an adjacency matrix to a relation.
 *
 * @param {boolean[][]} matrix - The adjacency matrix to convert.
 * @param {string[]} elements - The set of elements in the relation.
 * @returns {Relation} The relation represented by the adjacency matrix.
 */
export function matrixToRelation(matrix: boolean[][], elements: string[]): Relation {
  const relation: Relation = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        relation.push([elements[i], elements[j]])
      }
    }
  }

  return relation
}