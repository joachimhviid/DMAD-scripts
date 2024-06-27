import { test } from 'bun:test'
import { Graph, bfs, dfs, classifyEdges, allTopologicalSorts, findSCCs } from '@datastructures'

test('bfs', () => {
  // Create a graph and make sure the adjacent nodes are in alphabetical order
  const graph = new Graph()
  graph.addEdge('a', 'e')
  graph.addEdge('e', 'b')
  graph.addEdge('e', 'd')
  graph.addEdge('e', 'g')
  graph.addEdge('b', 'c')
  graph.addEdge('c', 'h')
  graph.addEdge('c', 'f')
  graph.addEdge('h', 'b')
  graph.addEdge('f', 'g')
  graph.addEdge('g', 'c')
  graph.addEdge('d', 'a')
  graph.addEdge('d', 'i')
  graph.addEdge('d', 'j')
  graph.addEdge('i', 'j')

  const order = bfs(graph, 'a')
  console.log('BFS order:', order)
})

test('dfs', () => {
  // Create a graph and make sure the adjacent nodes are in alphabetical order
  const graph = new Graph()
  graph.addEdge('a', 'd')
  graph.addEdge('a', 'b')
  graph.addEdge('b', 'c')
  graph.addEdge('b', 'e')
  graph.addEdge('b', 'd')
  graph.addEdge('c', 'f')
  graph.addEdge('g', 'c')
  graph.addEdge('g', 'f')
  graph.addEdge('e', 'f')
  graph.addEdge('e', 'd')

  const order = dfs(graph, 'a')
  console.log('DFS order:', order)

  const graphDetails = classifyEdges(graph)
  console.log(graphDetails)

  const orders = allTopologicalSorts(graph)
  console.table(orders)
})

test('scc', () => {
  // Create a graph and make sure the adjacent nodes are in alphabetical order
  const graph = new Graph()
  graph.addEdge('a', 'e')
  graph.addEdge('b', 'a')
  graph.addEdge('b', 'c')
  graph.addEdge('c', 'd')
  graph.addEdge('c', 'f')
  graph.addEdge('d', 'f')
  graph.addEdge('e', 'b')
  graph.addEdge('e', 'h')
  graph.addEdge('f', 'i')
  graph.addEdge('g', 'e')
  graph.addEdge('h', 'g')
  graph.addEdge('h', 'c')
  graph.addEdge('h', 'i')
  graph.addEdge('i', 'j')
  graph.addEdge('j', 'f')

  const scc = findSCCs(graph)
  console.log(scc)

})