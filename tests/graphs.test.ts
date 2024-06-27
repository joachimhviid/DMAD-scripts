import { test } from 'bun:test'
import {
  Graph,
  bfs,
  dfs,
  classifyEdges,
  allTopologicalSorts,
  findSCCs,
  WeightedGraph,
  DirectedWeightedGraph, dijkstra,
} from '@datastructures'

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

test('mst prim', () => {
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

test('dijkstra', () => {
  const graph = new DirectedWeightedGraph()
  graph.addEdge('a', 'b', 4)
  graph.addEdge('a', 'g', 7)
  graph.addEdge('b', 'c', 1)
  graph.addEdge('b', 'd', 2)
  graph.addEdge('c', 'a', 2)
  graph.addEdge('c', 'f', 6)
  graph.addEdge('d', 'c', 1)
  graph.addEdge('d', 'f', 4)
  graph.addEdge('e', 'c', 8)
  graph.addEdge('f', 'e', 1)
  graph.addEdge('g', 'e', 6)
  graph.addEdge('g', 'c', 4)

  const order = dijkstra(graph, 'a')
  console.log('Dijkstra order:', order)
})

test('mst kruskal', () => {
  const graph = new WeightedGraph()
  graph.addEdge('a', 'e', 8)
  graph.addEdge('a', 'c', 6)
  graph.addEdge('a', 'g', 9)
  graph.addEdge('b', 'g', 3)
  graph.addEdge('b', 'h', 11)
  graph.addEdge('b', 'd', 5)
  graph.addEdge('c', 'd', 2)
  graph.addEdge('c', 'f', 12)
  graph.addEdge('d', 'g', 7)
  graph.addEdge('e', 'f', 0)
  graph.addEdge('g', 'h', 10)

  const mst = graph.kruskalMST()
  console.log('MST:', mst.graph.toString())
  console.log(mst.firstSkippedEdge)
})