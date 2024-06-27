import { PriorityQueue, DisjointSet } from './structures.ts'

export class Graph {
  adjacencyList: Map<string, string[]>

  constructor() {
    this.adjacencyList = new Map()
  }

  addEdge(node1: string, node2: string): void {
    if (!this.adjacencyList.has(node1)) {
      this.adjacencyList.set(node1, [])
    }
    this.adjacencyList.get(node1)!.push(node2)
  }
}

export function bfs(graph: Graph, start: string): { node: string, depth: number }[] {
  let visited = new Set<string>()
  let queue: { node: string, depth: number }[] = [{ node: start, depth: 0 }]
  let order: { node: string, depth: number }[] = []

  while (queue.length > 0) {
    let { node, depth } = queue.shift()! // Remove the first node from the queue

    if (!visited.has(node)) {
      visited.add(node) // Mark the node as visited
      order.push({ node, depth }) // Add the node to the visit order

      let neighbors = graph.adjacencyList.get(node)
      if (neighbors) {
        neighbors.sort()
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push({ node: neighbor, depth: depth + 1 }) // Add all unvisited neighbors to the queue with depth
          }
        }
      }
    }
  }

  return order
}

export function dfs(graph: Graph, start: string): string[] {
  let visited = new Set<string>()
  let order: string[] = []

  function dfsHelper(node: string) {
    if (visited.has(node)) return
    visited.add(node)
    order.push(node)

    let neighbors = graph.adjacencyList.get(node)
    if (neighbors) {
      neighbors.sort()
      for (let neighbor of neighbors) {
        dfsHelper(neighbor)
      }
    }
  }

  dfsHelper(start)
  return order
}

type EdgeType = 'tree' | 'back' | 'forward' | 'cross';

export function classifyEdges(graph: Graph): Record<EdgeType, number> {
  let discoveryTime = new Map<string, number>()
  let finishTime = new Map<string, number>()
  let time = 0
  let edgeCounts: Record<EdgeType, number> = {
    tree: 0,
    back: 0,
    forward: 0,
    cross: 0,
  }

  function dfs(node: string, parent: string | null) {
    discoveryTime.set(node, ++time)

    let neighbors = graph.adjacencyList.get(node)
    if (neighbors) {
      neighbors.sort()
      for (let neighbor of neighbors) {
        if (!discoveryTime.has(neighbor)) {
          edgeCounts.tree++
          dfs(neighbor, node)
        } else if (!finishTime.has(neighbor)) {
          if (parent !== neighbor) {
            edgeCounts.back++
          }
        } else if (discoveryTime.get(node)! < discoveryTime.get(neighbor)!) {
          edgeCounts.forward++
        } else {
          edgeCounts.cross++
        }
      }
    }

    finishTime.set(node, ++time)
  }

  for (let node of graph.adjacencyList.keys()) {
    if (!discoveryTime.has(node)) {
      dfs(node, null)
    }
  }

  return edgeCounts
}

export function topologicalSort(graph: Graph): string[] {
  let visited = new Set<string>()
  let stack: string[] = []

  function dfs(node: string) {
    visited.add(node)

    let neighbors = graph.adjacencyList.get(node)
    if (neighbors) {
      neighbors.sort()
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor)
        }
      }
    }

    // All neighbors are visited, push node to stack
    stack.push(node)
  }

  // Visit all nodes
  for (let node of graph.adjacencyList.keys()) {
    if (!visited.has(node)) {
      dfs(node)
    }
  }

  // Reverse the stack to get the topological order
  return stack.reverse()
}

// Note that the graph must be a DAG for this to work. Nodes without edges are omitted from the final result as they can be placed anywhere.
export function allTopologicalSorts(graph: Graph): string[][] {
  let inDegree = new Map<string, number>()
  let visited = new Set<string>()
  let result: string[][] = []
  let path: string[] = []

  // Initialize inDegree map
  for (let node of graph.adjacencyList.keys()) {
    inDegree.set(node, 0)
  }

  // Calculate inDegree for each node
  for (let [node, neighbors] of graph.adjacencyList.entries()) {
    for (let neighbor of neighbors) {
      inDegree.set(neighbor, inDegree.get(neighbor)! + 1)
    }
  }

  function dfs() {
    let flag = false

    for (let [node, degree] of inDegree.entries()) {
      if (!visited.has(node) && degree === 0) {
        visited.add(node)
        path.push(node)
        for (let neighbor of graph.adjacencyList.get(node)!) {
          inDegree.set(neighbor, inDegree.get(neighbor)! - 1)
        }

        dfs()

        visited.delete(node)
        path.pop()
        for (let neighbor of graph.adjacencyList.get(node)!) {
          inDegree.set(neighbor, inDegree.get(neighbor)! + 1)
        }

        flag = true
      }
    }

    if (!flag) {
      result.push([...path])
    }
  }

  dfs()
  return result
}

export function findSCCs(graph: Graph): string[][] {
  let index = 0
  let stack: string[] = []
  let inStack = new Set<string>()
  let indices = new Map<string, number>()
  let lowLink = new Map<string, number>()
  let sccs: string[][] = []

  function strongConnect(node: string) {
    indices.set(node, index)
    lowLink.set(node, index)
    index++
    stack.push(node)
    inStack.add(node)

    let neighbors = graph.adjacencyList.get(node)
    if (neighbors) {
      for (let neighbor of neighbors) {
        if (!indices.has(neighbor)) {
          strongConnect(neighbor)
          lowLink.set(node, Math.min(lowLink.get(node)!, lowLink.get(neighbor)!))
        } else if (inStack.has(neighbor)) {
          lowLink.set(node, Math.min(lowLink.get(node)!, indices.get(neighbor)!))
        }
      }
    }

    if (lowLink.get(node) === indices.get(node)) {
      let scc: string[] = []
      let w: string | undefined
      do {
        w = stack.pop()
        if (w) {
          inStack.delete(w)
          scc.push(w)
        }
      } while (w !== node)
      sccs.push(scc)
    }
  }

  for (let node of graph.adjacencyList.keys()) {
    if (!indices.has(node)) {
      strongConnect(node)
    }
  }

  return sccs
}

type Edge = { node: string, weight: number };

export class DirectedWeightedGraph {
  adjacencyList: Map<string, Edge[]>

  constructor() {
    this.adjacencyList = new Map()
  }

  addEdge(node1: string, node2: string, weight: number) {
    if (!this.adjacencyList.has(node1)) this.adjacencyList.set(node1, [])
    if (!this.adjacencyList.has(node2)) this.adjacencyList.set(node2, [])
    this.adjacencyList.get(node1)!.push({ node: node2, weight })
  }

  getAdjVertices(node: string): Edge[] {
    return this.adjacencyList.get(node) || []
  }
}

export class WeightedGraph {
  adjacencyList: Map<string, Edge[]>

  constructor() {
    this.adjacencyList = new Map()
  }

  addEdge(node1: string, node2: string, weight: number) {
    if (!this.adjacencyList.has(node1)) this.adjacencyList.set(node1, [])
    if (!this.adjacencyList.has(node2)) this.adjacencyList.set(node2, [])
    this.adjacencyList.get(node1)!.push({ node: node2, weight })
    this.adjacencyList.get(node2)!.push({ node: node1, weight })
  }

  primsMST(start: string) {
    const nodes = Array.from(this.adjacencyList.keys())
    const distances = new Map(nodes.map(node => [node, Infinity]))
    distances.set(start, 0)
    const parents: Map<string, string | null> = new Map(nodes.map(node => [node, null]))
    const visited = new Set()
    const order: string[] = [] // Array to keep track of the order of nodes

    while (nodes.length) {
      nodes.sort((a, b) => distances.get(a)! - distances.get(b)!)
      const closest = nodes.shift()!

      visited.add(closest)
      order.push(closest) // Add the node to the order array when it is visited

      for (const neighbor of this.adjacencyList.get(closest)!) {
        if (!visited.has(neighbor.node)) {
          if (neighbor.weight < distances.get(neighbor.node)!) {
            distances.set(neighbor.node, neighbor.weight)
            parents.set(neighbor.node, closest)
          }
        }
      }
    }

    const mst = Array.from(parents.entries())
      .filter(([child, parent]) => parent !== null)
      .map(([child, parent]) => ({ from: parent!, to: child, weight: distances.get(child)! }))

    return { mst, order } // Return both the MST and the order of nodes
  }

  kruskalMST() {
    const mst = new WeightedGraph()
    const nodes = Array.from(this.adjacencyList.keys())
    const edges: { node1: string, node2: string, weight: number }[] = []
    const disjointSet = new DisjointSet()
    let firstSkippedEdge: { node1: string, node2: string, weight: number } | null = null

    // Initialize disjoint set with all nodes
    nodes.forEach(node => disjointSet.makeSet(node))

    // Get all edges from the graph
    for (let node of nodes) {
      const neighbors = this.adjacencyList.get(node)!
      for (let neighbor of neighbors) {
        // To avoid duplicate edges, only add edges in one direction
        if (node < neighbor.node) {
          edges.push({ node1: node, node2: neighbor.node, weight: neighbor.weight })
        }
      }
    }

    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight)

    // Add edges to the MST, skipping those that create a cycle
    for (let edge of edges) {
      console.log('processing edge', edge)
      if (disjointSet.findSet(edge.node1) !== disjointSet.findSet(edge.node2)) {
        console.log('adding edge', edge)
        mst.addEdge(edge.node1, edge.node2, edge.weight)
        disjointSet.union(edge.node1, edge.node2)
      } else {
        // If this edge would create a cycle and we haven't skipped any edges yet, record it
        if (firstSkippedEdge === null) {
          firstSkippedEdge = edge
        }
      }
    }

    return { graph: mst, firstSkippedEdge }
  }

  toString(): string {
    let result = ''
    for (let [node, edges] of this.adjacencyList.entries()) {
      result += `${node} -> `
      for (let edge of edges) {
        result += `${edge.node}(${edge.weight}), `
      }
      result = result.slice(0, -2) // Remove trailing comma and space
      result += '\n'
    }
    return result
  }
}

function initSingleSource(graph: DirectedWeightedGraph, source: string) {
  const dist = new Map<string, number>()
  const prev = new Map<string, string | null>()

  for (let vertex of graph.adjacencyList.keys()) {
    dist.set(vertex, Infinity)
    prev.set(vertex, null)
  }
  dist.set(source, 0)

  return { dist, prev }
}

function relax(u: string, v: string, weight: number, dist: Map<string, number>, prev: Map<string, string | null>, pq: PriorityQueue<string>) {
  if (dist.get(v)! > dist.get(u)! + weight) {
    dist.set(v, dist.get(u)! + weight)
    prev.set(v, u)
    pq.decreaseKey(v, dist.get(v)!)
    return true // Distance was updated
  }
  return false // Distance was not updated
}

export function dijkstra(graph: DirectedWeightedGraph, source: string) {
  const { dist, prev } = initSingleSource(graph, source)
  const pq = new PriorityQueue<string>()
  const S = new Set<string>()
  const removedFromQueue = new Set<string>()
  let relaxCount = 0
  let relaxChanges = 0

  graph.adjacencyList.forEach((_, vertex) => {
    pq.enqueue(vertex, dist.get(vertex)!)
  })

  while (!pq.isEmpty()) {
    const u = pq.dequeue()!
    S.add(u)
    removedFromQueue.add(u)

    for (let { node: v, weight } of graph.getAdjVertices(u)) {
      // if (!S.has(v)) {
      relaxCount++
      if (relax(u, v, weight, dist, prev, pq)) relaxChanges++
      // }
    }
  }

  return { dist, prev, removedFromQueue, relaxCount, relaxChanges }
}