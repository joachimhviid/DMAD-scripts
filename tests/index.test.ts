import { test } from 'bun:test'
import { isLittleO, isLittleOmega, isOmega, isTheta } from '@datastructures'

test('assignment', () => {
  console.log(isOmega(
    (n) => n,
    (n) => Math.pow(Math.log(n), 2),
    1000
  ))

  console.log(isLittleOmega(
    (n) => Math.pow(4, n),
    (n) => Math.pow(2, n),
    1000
  ))

  console.log(isTheta(
    (n) => n+n+n,
    (n) => n/3,
    1000
  ))

  console.log(isTheta(
    (n) => Math.pow(Math.log(n), 3),
    (n) => 3 * Math.log(n),
    1000
  ))

  console.log(isLittleO(
    (n) => Math.pow(n, 2) / Math.log(n),
    (n) => Math.pow(n, 2) * Math.log(n),
    1000
  ))

  console.log(isTheta(
    (n) => Math.pow(n, 1.5) + Math.pow(n, 2),
    (n) => Math.pow(n, 1.75),
    1000
  ))

  console.log(isLittleO(
    (n) => Math.pow(2, n),
    (n) => Math.pow(n, n),
    1000
  ))
})