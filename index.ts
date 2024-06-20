import { areEquivalent, conjunction, disjunction, generateTruthTable, negation } from '@discrete-mathematics'

function main() {
  const variables = ['p', 'q']
  const expression1 = (values: Record<string, boolean>) => disjunction(conjunction(values['p'], values['q']), conjunction(values['p'], negation(values['q'])))
  const expression2 = (values: Record<string, boolean>) => values['p']

  console.log('Expression 1: ')
  const table1 = generateTruthTable(expression1, variables)
  console.table(table1)

  console.log('Expression 2: ')
  const table2 = generateTruthTable(expression2, variables)
  console.table(table2)

  console.log('Are equivalent: ', areEquivalent(table1, table2))

  // console.log('\nAre equivalent: ', areEquivalent(expression1, expression2, variables))
}

main()