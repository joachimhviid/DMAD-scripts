export type TreeNode = {
  // The key (value) of the node
  key: number
  // Whether the node is black or not
  isBlack: boolean
  // Left child
  left: TreeNode | null
  // Right child
  right: TreeNode | null
  // Length of the longest black streak in the subtree
  maxS: number
  // Length of the longest black streak starting at the smallest key in the subtree
  maxLS: number
  // Length of the longest black streak ending at the largest key in the subtree
  maxRS: number
  // Whether the subtree contains a white node
  hasWhite: boolean
}

// Function to calculate maxS, maxLS, maxRS, and hasWhite for a given node
export function updateNode(v: TreeNode | null): void {
  if (!v) return

  const left = v.left
  const right = v.right

  // Calculate hasWhite
  v.hasWhite = !!(!v.isBlack || (left && left.hasWhite) || (right && right.hasWhite))

  // Calculate maxLS and maxRS
  if (v.isBlack) {
    v.maxLS = (left ? left.maxS : 0) + 1 + (right ? right.maxLS : 0)
    v.maxRS = (right ? right.maxS : 0) + 1 + (left ? left.maxRS : 0)
  } else {
    v.maxLS = left ? left.maxLS : 0
    v.maxRS = right ? right.maxRS : 0
  }

  // Calculate maxS
  if (v.isBlack) {
    const leftMaxS = left ? left.maxS : 0
    const rightMaxS = right ? right.maxS : 0
    const throughV = (left ? left.maxRS : 0) + 1 + (right ? right.maxLS : 0)
    v.maxS = Math.max(leftMaxS, rightMaxS, throughV)
  } else {
    const leftMaxS = left ? left.maxS : 0
    const rightMaxS = right ? right.maxS : 0
    v.maxS = Math.max(leftMaxS, rightMaxS)
  }
}

enum TreeNodeColor {
  RED,
  BLACK
}

class Node {
  left: Node | null = null
  right: Node | null = null
  color: TreeNodeColor = TreeNodeColor.RED

  constructor(public key: number, public parent: Node | null = null) {
  }
}

export class RedBlackTree {
  root: Node | null = null

  rotateLeft(node: Node) {
    let temp = node.right!
    node.right = temp.left

    if (node.parent === null) {
      this.root = temp
    } else if (node === node.parent.left) {
      node.parent.left = temp
    } else {
      node.parent.right = temp
    }

    temp.left = node
    node.parent = temp
  }

  rotateRight(node: Node) {
    let temp = node.left!
    node.left = temp.right

    if (node.parent === null) {
      this.root = temp
    } else if (node === node.parent.right) {
      node.parent.right = temp
    } else {
      node.parent.left = temp
    }

    temp.right = node
    node.parent = temp
  }

  fixTree(node: Node) {
    while (node !== this.root && node.parent!.color === TreeNodeColor.RED) {
      if (node.parent === node.parent!.parent!.left) {
        let uncle = node.parent!.parent!.right
        if (uncle && uncle.color === TreeNodeColor.RED) {
          node.parent!.color = TreeNodeColor.BLACK
          uncle.color = TreeNodeColor.BLACK
          node.parent!.parent!.color = TreeNodeColor.RED
          node = node.parent!.parent!
        } else {
          if (node === node.parent!.right) {
            node = node.parent!
            this.rotateLeft(node)
          }
          node.parent!.color = TreeNodeColor.BLACK
          node.parent!.parent!.color = TreeNodeColor.RED
          this.rotateRight(node.parent!.parent!)
        }
      } else {
        let uncle = node.parent!.parent!.left
        if (uncle && uncle.color === TreeNodeColor.RED) {
          node.parent!.color = TreeNodeColor.BLACK
          uncle.color = TreeNodeColor.BLACK
          node.parent!.parent!.color = TreeNodeColor.RED
          node = node.parent!.parent!
        } else {
          if (node === node.parent!.left) {
            node = node.parent!
            this.rotateRight(node)
          }
          node.parent!.color = TreeNodeColor.BLACK
          node.parent!.parent!.color = TreeNodeColor.RED
          this.rotateLeft(node.parent!.parent!)
        }
      }
    }
    this.root!.color = TreeNodeColor.BLACK
  }

  insert(key: number) {
    let node = this.root
    let parent: Node | null = null

    while (node !== null) {
      parent = node
      if (key < node.key) {
        node = node.left
      } else if (key > node.key) {
        node = node.right
      } else {
        return
      }
    }

    let newNode = new Node(key, parent)
    if (parent === null) {
      this.root = newNode
    } else if (newNode.key < parent.key) {
      parent.left = newNode
    } else {
      parent.right = newNode
    }

    this.fixTree(newNode)
  }

  insertKeys(keys: number[]) {
    for (const key of keys) {
      this.insert(key)
    }
  }

  print(node: Node | null = this.root, spaceCount: number = 0, label: string = 'ROOT'): void {
    if (!node) return

    const space = ' '.repeat(spaceCount)
    const color = node.color === TreeNodeColor.RED ? 'R' : 'B'
    console.log(`${space}${label}[${color}]: ${node.key}`)

    this.print(node.left, spaceCount + 4, 'LEFT')
    this.print(node.right, spaceCount + 4, 'RIGHT')
  }
}