import { test } from 'bun:test'
import { buildHuffmanTree, Node, getBitsForChar, getTotalBits } from '@datastructures'

test('huffman', () => {
  const nodes = [
    new Node('b', 90),
    new Node('c', 15),
    new Node('d', 40),
    new Node('f', 30),
    new Node('g', 125),
    new Node('h', 35),
  ]

  const tree = buildHuffmanTree(nodes)
  console.log('Huffman tree:', tree)
  const bits = getBitsForChar(tree, 'd')
  console.log('Bits for char d:', bits)
  const totalBits = getTotalBits(tree)
  console.log('Total bits:', totalBits)
})