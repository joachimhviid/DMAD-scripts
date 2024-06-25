import { test } from 'bun:test'
import type { TreeNode } from '@datastructures'
import { updateNode } from '@datastructures'

test('trees', () => {
  const exampleTree: TreeNode = {
    key: 10,
    isBlack: true,
    left: {
      key: 5,
      isBlack: true,
      left: null,
      right: null,
      maxS: 0,
      maxLS: 0,
      maxRS: 0,
      hasWhite: false,
    },
    right: {
      key: 15,
      isBlack: false,
      left: null,
      right: null,
      maxS: 0,
      maxLS: 0,
      maxRS: 0,
      hasWhite: true,
    },
    maxS: 0,
    maxLS: 0,
    maxRS: 0,
    hasWhite: false,
  }

  updateNode(exampleTree.left)
  updateNode(exampleTree.right)
  updateNode(exampleTree)

  console.log(exampleTree)
})