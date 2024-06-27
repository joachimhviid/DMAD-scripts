import { test, expect } from 'bun:test'
import { solveRecurrence, isBigO } from '@datastructures'

test('solve recurrence - constant', () => {
  const a = 1
  const b = 2
  const f = (n: number) => 1 / 2
  const result = solveRecurrence(a, b, f)

  console.log('constant result', result)

  // expect(result).toBe('T(n) = Θ(log n)')
})

test('solve recurrence - linear', () => {
  const a = 2
  const b = 2
  const f = (n: number) => n
  const result = solveRecurrence(a, b, f)

  console.log('linear result', result)

  // expect(result).toBe('T(n) = Θ(n log n)')
})

test('solve recurrence - sqrt', () => {
  const a = 2
  const b = 2
  const f = (n: number) => Math.sqrt(n)
  const result = solveRecurrence(a, b, f)

  console.log('sqrt result', result)

  // expect(result).toBe('T(n) = Θ(n)')
})

test('question 5', () => {
  /**
   * Various functions used in the complexity statements.
   */
  const sqrtN = (n: number) => Math.sqrt(n)
  const logN = (n: number) => Math.log(n)
  const nLogN = (n: number) => n * Math.log(n)
  const n = (n: number) => n
  const n2 = (n: number) => n + n
  const n3over2 = (n: number) => Math.pow(n, 3 / 2)
  const logN2 = (n: number) => Math.pow(Math.log(n), 2)
  const n1over2 = (n: number) => Math.pow(n, 1 / 2)
  const n3 = (n: number) => Math.pow(n, 3)
  const logN3 = (n: number) => Math.pow(Math.log(n), 3)
  const twoToN = (n: number) => Math.pow(2, n) * n
  const threeToN = (n: number) => Math.pow(3, n)
  const twoNLogN = (n: number) => Math.pow(2, n) * Math.log(n)
  const n1over7 = (n: number) => Math.pow(n, 1 / 7)
  const logN17 = (n: number) => Math.log(Math.pow(n, 17))

  // console.log('n is O(sqrt(n)):', isBigO(n, sqrtN)) // False
  console.log('1')
  // expect(isBigO(n, sqrtN)).toBe(false)
  // console.log('n + n is O(n log n):', isBigO(n2, nLogN)) // True
  console.log('2')
  // expect(isBigO(n2, nLogN)).toBe(true)
  // console.log('n log n is O(n^3/2):', isBigO(nLogN, n3over2)) // True
  console.log('3')
  // expect(isBigO(nLogN, n3over2)).toBe(true)
  // console.log('(log n)^2 is O(n^1/2):', isBigO(logN2, n1over2)) // True
  console.log('4')
  // expect(isBigO(logN2, n1over2)).toBe(true)
  // console.log('3^n is O((log n)^3):', isBigO(threeToN, logN3)) // False
  console.log('5')
  // expect(isBigO(threeToN, logN3)).toBe(false)
  // console.log('2^n log n is O(2^n n):', isBigO((n) => Math.pow(2, n) * Math.log(n), (n) => Math.pow(2, n) * n)) // True
  console.log('6')
  // expect(isBigO((n) => Math.pow(2, n) * Math.log(n), (n) => Math.pow(2, n) * n)).toBe(true)
  // console.log('n^(1/7) is O((log(n))^17):', isBigO(n1over7, logN17)) // False
  console.log('7')
  // expect(isBigO(n1over7, logN17)).toBe(false)

  // console.log('n is O(log n)', isBigO((n) => n, (n) => Math.log2(n), 1000))
  // console.log('(log n)^3 is O(n^2)', isBigO(
  //   (n) => Math.pow(Math.log2(n), 3),
  //   (n) => Math.pow(n, 2),
  //   1000
  // ))
  // console.log('n log n is O(n^1.5)', isBigO(
  //   (n) => n * Math.log2(n),
  //   (n) => Math.pow(n, 1.5),
  //   1000
  // ))
  // console.log('2^n is O(sqrt(n))', isBigO(
  //   (n) => Math.pow(2, n),
  //   (n) => Math.sqrt(n),
  //   1000
  // ))
  // console.log('3n^2 is O(n^2)', isBigO(
  //   (n) => 3 * Math.pow(n, 2),
  //   (n) => Math.pow(n, 2),
  //   1000
  // ))
  // console.log('7^n is O((log n)^7)', isBigO(
  //   (n) => Math.pow(7, n),
  //   (n) => Math.pow(Math.log2(n), 7),
  //   1000
  // ))
  // console.log('log n! is O(n^2)', isBigO(
  //   (n) => Math.log2(factorialize(n)),
  //   (n) => Math.pow(n, 2),
  //   1000
  // ))

  // console.log('log n is little omega(n^2)', isLittleOmega(
  //   (n) => Math.log2(n),
  //   (n) => Math.pow(n, 2),
  //   1000
  // ))
  // console.log('n^2+n^3 is theta(n^3)', isTheta(
  //   (n) => Math.pow(n, 2) + Math.pow(n, 3),
  //   (n) => Math.pow(n, 3),
  //   1000
  // ))
  // console.log('6 is o(7)', isLittleO(
  //   (n) => 6,
  //   (n) => 7,
  //   1000
  // ))
  // console.log('3^n is omega(2^n)', isOmega(
  //   (n) => Math.pow(3, n),
  //   (n) => Math.pow(2, n),
  //   1000
  // ))
  // console.log('n / (log n)^2 is o((log n)^3)', isLittleO(
  //   (n) => n / Math.pow(Math.log2(n), 2),
  //   (n) => Math.pow(Math.log2(n), 3),
  //   1000
  // ))
  // console.log('n^n is omega(2^n)', isOmega(
  //   (n) => Math.pow(n, n),
  //   (n) => Math.pow(2, n),
  //   1000
  // ))
  // console.log('n^1.1 is little omega(n log n)', isLittleOmega(
  //   (n) => Math.pow(n, 1.1),
  //   (n) => n * Math.log2(n),
  //   1000
  // ))
})

/** Example usage:

 /**
 *function sqrtFunction(n: number): number {
 *  return Math.sqrt(n)
 *}
 *
 * // Solve the recurrence T(n) = 2 * T(n/2) + sqrt(n)
 * console.log(solveRecurrence(2, 2, sqrtFunction)) // Output should be 'T(n) = Θ(n)'
 */