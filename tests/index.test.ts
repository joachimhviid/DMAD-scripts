import { test } from 'bun:test'
import { RedBlackTree } from '@datastructures'

test('assignment', () => {
  const redblacktree = new RedBlackTree()
  const keysToInsert = [18, 9, 21, 7, 15, 24, 4, 11, 16]
  redblacktree.insertKeys(keysToInsert)
  redblacktree.print()

  redblacktree.insert(25)
  redblacktree.print()

})