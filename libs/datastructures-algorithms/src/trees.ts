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

function updateNodeProperties(node: Node): void {
  if (!node) return

  let min = node.key
  let max = node.key
  let ssg = 0

  if (node.left) {
    min = node.left.min
    ssg += node.left.ssg + (node.key - node.left.max) ** 2
  }

  if (node.right) {
    max = node.right.max
    ssg += node.right.ssg + (node.right.min - node.key) ** 2
  }

  node.min = min
  node.max = max
  node.ssg = ssg
}


enum TreeNodeColor {
  RED,
  BLACK
}

class Node {
  left: Node | null = null
  right: Node | null = null
  color: TreeNodeColor = TreeNodeColor.RED
  min: number
  max: number
  ssg: number

  constructor(public key: number, public parent: Node | null = null) {
    this.min = key
    this.max = key
    this.ssg = 0
  }
}

export class RedBlackTree {
  root: Node | null = null

  rotateLeft(node: Node) {
    if (node.right === null) {
      throw new Error('Cannot perform left rotation on a node without a right child')
    }
    const temp = node.right
    node.right = temp.left

    if (temp.left !== null) {
      temp.left.parent = node
    }

    temp.parent = node.parent

    if (node.parent === null) {
      this.root = temp
    } else if (node === node.parent.left) {
      node.parent.left = temp
    } else {
      node.parent.right = temp
    }

    temp.left = node
    node.parent = temp

    updateNodeProperties(node)
    updateNodeProperties(temp)
  }

  rotateRight(node: Node) {
    if (node.left === null) {
      throw new Error('Cannot perform right rotation on a node without a left child')
    }
    const temp = node.left
    node.left = temp.right

    if (temp.right !== null) {
      temp.right.parent = node
    }

    temp.parent = node.parent

    if (node.parent === null) {
      this.root = temp
    } else if (node === node.parent.right) {
      node.parent.right = temp
    } else {
      node.parent.left = temp
    }

    temp.right = node
    node.parent = temp

    updateNodeProperties(node)
    updateNodeProperties(temp)
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
    while (newNode) {
      updateNodeProperties(newNode)
      newNode = newNode.parent!
    }
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

  toString(node: Node | null = this.root, spaceCount: number = 0, label: string = 'ROOT'): string {
    if (!node) return ''

    const space = ' '.repeat(spaceCount)
    const color = node.color === TreeNodeColor.RED ? 'R' : 'B'
    // let result = `${space}${label}[${color}]: ${node.key}\n`
    let result = `${space}${label}[${color}]: ${node.key}, min: ${node.min}, max: ${node.max}, ssg: ${node.ssg}\n`

    result += this.toString(node.left, spaceCount + 4, 'LEFT')
    result += this.toString(node.right, spaceCount + 4, 'RIGHT')

    return result
  }
}