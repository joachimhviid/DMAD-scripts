import { test } from 'bun:test'

test('assignment', () => {
  // It is not true that there exists an integer x such that for all integers y, the equation x+y=2x holds
  const set1 = (x: number) => {
    for (let y = -10; y <= 10; y++) {
      if (x + y !== 2 * x) {
        return true
      }
    }
    return false
  }

  for (let i = 0; i < 10; i++) {
    console.log(set1(i))
  }
})