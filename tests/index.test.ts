import { test } from 'bun:test'
import { WeightedGraph } from '@datastructures'

test('assignment', () => {
  // Create a graph and make sure the adjacent nodes are in alphabetical order
  const graph = new WeightedGraph()
  graph.addEdge('a', 'c', 11)
  graph.addEdge('a', 'f', 10)
  graph.addEdge('a', 'h', 2)
  graph.addEdge('a', 'i', 3)
  graph.addEdge('b', 'c', 5)
  graph.addEdge('b', 'd', 13)
  graph.addEdge('c', 'h', 9)
  graph.addEdge('d', 'h', 1)
  graph.addEdge('h', 'i', 6)
  graph.addEdge('i', 'g', 12)
  graph.addEdge('i', 'f', 4)
  graph.addEdge('f', 'e', 7)
  graph.addEdge('e', 'g', 8)

  const mst = graph.primsMST('a')
  console.log('MST:', mst)

})