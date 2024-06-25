import { test } from 'bun:test'
import { equivalence } from '@discrete-mathematics'

test('exists in integers', () => {
  // For all x in the set of integers, x^2 > 2x
  // const set = (x: number) => Math.pow(x, 2) > 2 * x

  // There is no x in the set of integers such that x^2 > 2x
  // const set = (x: number) => !(Math.pow(x, 2) > 2 * x)

  // For all x in the set of integers, x^2 <= 2x
  // const set = (x: number) => Math.pow(x, 2) <= 2 * x

  // For all x in the set of integers, x < 5 or x^2 > 2x
  // const set = (x: number) => x < 5 || Math.pow(x, 2) > 2 * x

  // For all x in the set of integers, there exists a y in the set of integers such that x + y = 2x
  // const set = (x: number) => {
  //   for (let y = 0; y < 10; y++) {
  //     if (x + y === 2 * x) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  // There does not exist an x in the set of integers such that all y in the set of integers satisfy x + y = 2x
  const set1 = (x: number) => {
    for (let y = 0; y < 10; y++) {
      if (x + y !== 2 * x) {
        return false
      }
    }
    return true
  }

  // For all x in the set of integers, there exists a y in the set of integers such that x + y != 2x
  const set2 = (x: number) => {
    for (let y = 0; y < 10; y++) {
      if (x + y !== 2 * x) {
        return true
      }
    }
    return false
  }

  // For all x in the set of integers, all y in the set of integers satisfy x + y = 2x
  // const set = (x: number) => {
  //   for (let y = 0; y < 10; y++) {
  //     if (x + y !== 2 * x) {
  //       return false
  //     }
  //   }
  //   return true
  // }

  // There does not exist an x in the set of integers such that there exists a y in the set of integers such that x + y = 2x is the same as for all x in the set of integers, there exists a y in the set of integers that satisfy x + y != 2x
  const set = (x: number) => equivalence(set1(x), set2(x))

  for (let i = -10; i < 10; i++) {
    console.log(set(i))
  }
})