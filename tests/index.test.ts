import { test } from 'bun:test'
import {
  areEquivalent,
  conjunction,
  disjunction,
  equivalence,
  generateTruthTable,
  implication,
  negation,
} from '@discrete-mathematics'

test('assignment', () => {
  const variables = ['p', 'q', 'r', 's']

  console.table(generateTruthTable(
    (values) => disjunction(values['p'], disjunction(values['q'], values['r'])),
    variables,
  ))

  console.table(generateTruthTable(
    (values) => equivalence(conjunction(values['p'], values['q']), disjunction(values['p'], values['q'])),
    ['p', 'q'],
  ))

  console.table(generateTruthTable(
    (values) => implication(conjunction(values['p'], negation(values['q'])), conjunction(values['p'], negation(values['q']))),
    ['p', 'q'],
  ))

  const table1 = generateTruthTable(
    (values) => disjunction(
      negation(values['p']),
      negation(values['q']),
    ),
    ['p', 'q'],
  )

  const table2 = generateTruthTable(
    (values) => negation(
      conjunction(
        values['p'],
        values['q'],
      ),
    ),
    ['p', 'q'],
  )

  console.log(areEquivalent(table1, table2))

  console.table(generateTruthTable(
    (values) => disjunction(
      conjunction(
        values['p'],
        values['q'],
      ),
      conjunction(
        values['r'],
        values['s'],
      ),
    ),
    variables,
  ))



})