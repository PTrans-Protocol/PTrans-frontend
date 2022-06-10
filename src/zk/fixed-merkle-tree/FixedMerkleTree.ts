import { Element, HashFunction, MerkleTreeOptions, ProofPath, SerializedTreeState, TreeEdge, TreeSlice } from '.'
import defaultHash from './simpleHash'



export default class MerkleTree{

  levels: number
  private _hashFn: HashFunction<Element>
  private zeroElement: Element
  private _zeros: Element[]
  private _layers: Array<Element[]>
  constructor(levels: number, elements: Element[] = [], {
    hashFunction = defaultHash,
    zeroElement = 0,
  }: MerkleTreeOptions = {}) {
    this.levels = levels
    if (elements.length > this.capacity) {
      throw new Error('Tree is full')
    }
    this._hashFn = hashFunction
    this.zeroElement = zeroElement
    this._layers = []
    const leaves = elements.slice()
    this._layers = [leaves]
    this._zeros = [this.zeroElement]
    for (let i = 1; i <= this.levels; i++) {
      this._zeros[i] = this._hashFn(this._zeros[i - 1], this._zeros[i - 1])
    }
    this._buildHashes()
  }

  get capacity() {
    return 2 ** this.levels
  }

  get layers(): Array<Element[]> {
    return this._layers.slice()
  }

  get zeros(): Element[] {
    return this._zeros.slice()
  }

  get elements(): Element[] {
    return this._layers[0].slice()
  }

  get root(): Element {
    return this._layers[this.levels][0] ?? this._zeros[this.levels]
  }


  private _indexOf(elements: Element[], element: Element, fromIndex?: number, comparator?: <T> (arg0: T, arg1: T) => boolean): number {
    if (comparator) {
      return elements.findIndex((el) => comparator<Element>(element, el))
    } else {
      return elements.indexOf(element, fromIndex)
    }
  }

  private _buildHashes() {
    for (let layerIndex = 1; layerIndex <= this.levels; layerIndex++) {
      const nodes = this._layers[layerIndex - 1]
      this._layers[layerIndex] = this._processNodes(nodes, layerIndex)
    }
  }


  private _processNodes(nodes: Element[], layerIndex: number) {
    const length = nodes.length
    let currentLength = Math.ceil(length / 2)
    const currentLayer = new Array(currentLength)
    currentLength--
    const starFrom = length - ((length % 2) ^ 1)
    let j = 0
    for (let i = starFrom; i >= 0; i -= 2) {
      if (nodes[i - 1] === undefined) break
      const left = nodes[i - 1]
      const right = (i === starFrom && length % 2 === 1) ? this._zeros[layerIndex - 1] : nodes[i]
      currentLayer[currentLength - j] = this._hashFn(left, right)
      j++
    }
    return currentLayer
  }

  private _processUpdate(index: number) {
    for (let level = 1; level <= this.levels; level++) {
      index >>= 1
      const left = this._layers[level - 1][index * 2]
      const right = index * 2 + 1 < this._layers[level - 1].length
        ? this._layers[level - 1][index * 2 + 1]
        : this._zeros[level - 1]
      this._layers[level][index] = this._hashFn(left, right)
    }
  }

  /**
   * Insert multiple elements into the tree.
   * @param {Array} elements Elements to insert
   */
  bulkInsert(elements: Element[]): void {
    if (!elements.length) {
      return
    }

    if (this._layers[0].length + elements.length > this.capacity) {
      throw new Error('Tree is full')
    }
    // First we insert all elements except the last one
    // updating only full subtree hashes (all layers where inserted element has odd index)
    // the last element will update the full path to the root making the tree consistent again
    for (let i = 0; i < elements.length - 1; i++) {
      this._layers[0].push(elements[i])
      let level = 0
      let index = this._layers[0].length - 1
      while (index % 2 === 1) {
        level++
        index >>= 1
        this._layers[level][index] = this._hashFn(
          this._layers[level - 1][index * 2],
          this._layers[level - 1][index * 2 + 1],
        )
      }
    }
    this.insert(elements[elements.length - 1])
  }

  indexOf(element: Element, comparator?: <T> (arg0: T, arg1: T) => boolean): number {
    return this._indexOf(this._layers[0], element, 0, comparator)
  }

  proof(element: Element): ProofPath {
    const index = this.indexOf(element)
    return this.path(index)
  }

  getTreeEdge(edgeIndex: number): TreeEdge {
    const edgeElement = this._layers[0][edgeIndex]
    if (edgeElement === undefined) {
      throw new Error('Element not found')
    }
    const edgePath = this.path(edgeIndex)
    return { edgePath, edgeElement, edgeIndex, edgeElementsCount: this._layers[0].length }
  }

  /**
   * 🪓
   * @param count
   */
  getTreeSlices(count = 4): TreeSlice[] {
    const length = this._layers[0].length
    let size = Math.ceil(length / count)
    if (size % 2) size++
    const slices: TreeSlice[] = []
    for (let i = 0; i < length; i += size) {
      const edgeLeft = i
      const edgeRight = i + size
      slices.push({ edge: this.getTreeEdge(edgeLeft), elements: this.elements.slice(edgeLeft, edgeRight) })
    }
    return slices
  }

  /**
   * Serialize entire tree state including intermediate layers into a plain object
   * Deserializing it back will not require to recompute any hashes
   * Elements are not converted to a plain type, this is responsibility of the caller
   */
  serialize(): SerializedTreeState {
    return {
      levels: this.levels,
      _zeros: this._zeros,
      _layers: this._layers,
    }
  }

  /**
   * Deserialize data into a MerkleTree instance
   * Make sure to provide the same hashFunction as was used in the source tree,
   * otherwise the tree state will be invalid
   */
  static deserialize(data: SerializedTreeState, hashFunction?: HashFunction<Element>): MerkleTree {
    const instance: MerkleTree = Object.assign(Object.create(this.prototype), data)
    instance._hashFn = hashFunction || defaultHash
    instance.zeroElement = instance._zeros[0]
    return instance
  }

  toString() {
    return JSON.stringify(this.serialize())
  }

  insert(element: Element) {
    if (this._layers[0].length >= this.capacity) {
      throw new Error('Tree is full')
    }
    this.update(this._layers[0].length, element)
  }

    /**
   * Change an element in the tree
   * @param {number} index Index of element to change
   * @param element Updated element value
   */
  update(index: number, element: Element) {
    if (isNaN(Number(index)) || index < 0 || index > this._layers[0].length || index >= this.capacity) {
      throw new Error('Insert index out of bounds: ' + index)
    }
    this._layers[0][index] = element
    this._processUpdate(index)
  }

  /**
   * Get merkle path to a leaf
   * @param {number} index Leaf index to generate path for
   * @returns {{pathElements: Object[], pathIndex: number[]}} An object containing adjacent elements and left-right index
   */
  path(index: number): ProofPath {
    if (isNaN(Number(index)) || index < 0 || index >= this._layers[0].length) {
      throw new Error('Index out of bounds: ' + index)
    }
    let elIndex = +index
    const pathElements: Element[] = []
    const pathIndices: number[] = []
    const pathPositions: number [] = []
    for (let level = 0; level < this.levels; level++) {
      pathIndices[level] = elIndex % 2
      const leafIndex = elIndex ^ 1
      if (leafIndex < this._layers[level].length) {
        pathElements[level] = this._layers[level][leafIndex]
        pathPositions[level] = leafIndex
      } else {
        pathElements[level] = this._zeros[level]
        pathPositions[level] = 0
      }
      elIndex >>= 1
    }
    return {
      pathElements,
      pathIndices,
      pathPositions,
      pathRoot: this.root,
    }
  }
}

