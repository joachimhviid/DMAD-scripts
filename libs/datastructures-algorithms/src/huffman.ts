export class Node {
  char: string
  freq: number
  left: Node | null
  right: Node | null

  constructor(char: string, freq: number, left: Node | null = null, right: Node | null = null) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
  }
}

export function buildHuffmanTree(nodes: Node[]): Node | null {
  if (nodes.length === 0) return null

  // Sort the nodes array by frequency in ascending order
  nodes.sort((a, b) => a.freq - b.freq)

  while (nodes.length > 1) {
    // Remove the two nodes with the lowest frequency
    let left = nodes.shift()!
    let right = nodes.shift()!

    // Create a new node with these two nodes as children,
    // and the sum of their frequencies as the new frequency
    let newNode = new Node('', left.freq + right.freq, left, right)

    // Insert the new node back into the array
    nodes.push(newNode)

    // Re-sort the array
    nodes.sort((a, b) => a.freq - b.freq)
  }

  // The last node in the array is the root of the Huffman tree
  return nodes[0]
}

export function getBitsForChar(root: Node | null, char: string): number {
  function getBitsForCharHelper(node: Node | null, depth: number): number {
    if (!node) return -1
    if (node.char === char) return depth

    let left = getBitsForCharHelper(node.left, depth + 1)
    if (left !== -1) return left

    return getBitsForCharHelper(node.right, depth + 1)
  }

  return getBitsForCharHelper(root, 0)
}

export function getTotalBits(root: Node | null): number {
  function getTotalBitsHelper(node: Node | null, depth: number): number {
    if (!node) return 0
    if (!node.left && !node.right) return depth * node.freq // Leaf node

    // Non-leaf node, recurse on left and right children
    return getTotalBitsHelper(node.left, depth + 1) + getTotalBitsHelper(node.right, depth + 1)
  }

  return getTotalBitsHelper(root, 0)
}