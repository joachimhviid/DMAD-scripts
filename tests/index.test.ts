import { test } from 'bun:test'
import {
  allTopologicalSorts,
  bfs,
  buildHuffmanTree,
  buildMaxHeap, classifyEdges, dfs, dijkstra, DirectedWeightedGraph,
  findPossibleIndices, findSCCs,
  findValidH2Values, getBitsForChar, getTotalBits, Graph,
  type HashTable,
  isMaxHeap, Node, partition, RedBlackTree,
  tryInsertWithLinearProbing, WeightedGraph,
} from '@datastructures'

test('assignment', () => {
  const redblack = new RedBlackTree()
  const keys = [24, 18, 26, 5, 20, 27, 2, 7, 23]
  redblack.insertKeys(keys)
  console.log(redblack.toString())

  redblack.insert(21)
  console.log(redblack.toString())
})