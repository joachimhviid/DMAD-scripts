import { test } from 'bun:test'
import {
  areEquivalent,
  conjunction,
  disjunction,
  equivalence,
  generateTruthTable, implication, isTautology,
  negation,
} from '@discrete-mathematics'

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

  // It is not true that there exists an integer x such that for all integers y, the equation x+y=2x holds
  const set1 = (x: number) => {
    for (let y = -10; y <= 10; y++) {
      if (x + y !== 2 * x) {
        return true
      }
    }
    return false
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

test('logical statements', () => {
  const statement1 = generateTruthTable((values) => disjunction(conjunction(values['p'], values['q']), conjunction(values['p'], negation((values['q'])))), ['p', 'q'])
  const statement2 = generateTruthTable((values) => values['p'], ['p', 'q'])
  console.table(statement1)
  console.table(statement2)
  console.log(areEquivalent(statement1, statement2))

  const statement3 = generateTruthTable((values) => equivalence(values['p'], negation(values['q'])), ['p', 'q'])
  const statement4 = generateTruthTable((values) => conjunction(values['p'], negation(values['q'])), ['p', 'q'])
  console.table(statement3)
  console.table(statement4)

  console.log('Is statement a tautology?', isTautology((values) => implication(values['p'], disjunction(values['p'], values['q'])), ['p', 'q']))

  const statement5 = generateTruthTable((values) => disjunction(
    conjunction(negation(values['p']), values['q']),
    conjunction(values['p'], values['r']),
  ), ['p', 'q', 'r'])

  console.table(statement5)
})