
import { AbstractFile } from '../types';

export interface TreeNode {
  isDirectory: boolean
  children: TreeNode[]
  title: string
  fileName?: string,
  expanded?: boolean
}

function sort(a: TreeNode, b: TreeNode): number {
  return a.fileName < b.fileName ? -1 : 1
}
export function filesToTreeNodes(arr: AbstractFile[], childSortCompareFn: (a: TreeNode, b: TreeNode) => number = sort, nodeEnhance: (node: TreeNode, f: AbstractFile)=>TreeNode = n=>n): TreeNode[] {
  var tree = {}
  function addnode(obj: AbstractFile) {
    var splitpath = obj.fileName.replace(/^\/|\/$/g, "").split('/');
    var ptr = tree;
    for (let i = 0; i < splitpath.length; i++) {
      const isFile = i == splitpath.length - 1
      let node: TreeNode = {
        title: splitpath[i],
        fileName : isFile ? obj.fileName : splitpath[i],
        children: [],
        expanded: !isFile,
        isDirectory: !isFile
      }
      Object.assign(node, nodeEnhance(node, obj))
      // @ts-ignore
      ptr[splitpath[i]] = ptr[splitpath[i]] || node;
      // @ts-ignore
      ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
      // @ts-ignore
      ptr = ptr[splitpath[i]].children;
    }
  }
  // @ts-ignore
  function objectToArr(node) {
    Object.keys(node || {}).map((k) => {
      if (node[k].children) {
        objectToArr(node[k])
      }
    })
    if (node.children) {
      node.children = toArray(node.children)
      node.children.forEach(objectToArr)
    }
  }
  function toArray(obj: { [key: string]: TreeNode }) {
    const arr = Object.values(obj)
    return childSortCompareFn ? arr.sort(childSortCompareFn) : arr
  }
  arr.map(addnode);
  objectToArr(tree)
  return toArray(tree)
}

