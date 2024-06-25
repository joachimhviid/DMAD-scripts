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