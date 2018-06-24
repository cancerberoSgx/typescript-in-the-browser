const DEBUG = false
export function debugFactory(componentName: string): Debug {
  return function debug(m: string) {
    if (DEBUG) {
      console.log(`${componentName} debug: ${m}`)
    }
  }
}
export type Debug = (m: string) => void




import * as ts from "typescript";
export function buildCompilerOptions(compilerOptions: ts.CompilerOptions|string) {
  let finalCompilerOptions: ts.CompilerOptions|undefined
  if(typeof compilerOptions==='string'){      
    const tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json',compilerOptions)
    if(tsConfigJson.error){
      console.log('ts.parseConfigFileTextToJson ERROR: '+tsConfigJson.error)
      throw tsConfigJson.error
    }
    let { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
    if (errors && errors.length) {    //TODO. better errors
      throw errors
    }
    finalCompilerOptions = options
  }else {
    finalCompilerOptions = compilerOptions
  }
  return finalCompilerOptions
}

export const defaultFormatDiagnosticHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName(fileName: string) { return fileName },
  getCurrentDirectory() { return '.' },
  getNewLine() { return '\n' }
}




import { ProgramFile } from '../programProvider';
export interface TreeNode {
  isDirectory: boolean
  children: TreeNode[]
  title: string
  fileName?:string,
  expanded?: boolean
}
export function filesToTreeNodes(arr: ProgramFile[]): TreeNode[] {
  var tree = {}
  function addnode(obj: ProgramFile) {
    var splitpath = obj.fileName.replace(/^\/|\/$/g, "").split('/');
    var ptr = tree;
    for (let i = 0; i < splitpath.length; i++) {
      let node: TreeNode = {
        title: splitpath[i],
        children: [],
        expanded: true,
        isDirectory: true
      };
      if (i == splitpath.length - 1) {
        node.fileName=obj.fileName
        node.isDirectory = false
      }
      ptr[splitpath[i]] = ptr[splitpath[i]] || node;
      ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
      ptr = ptr[splitpath[i]].children;
    }
  }
  function objectToArr(node) {
    Object.keys(node || {}).map((k) => {
      if (node[k].children) {
        objectToArr(node[k])
      }
    })
    if (node.children) {
      node.children = Object.values(node.children)
      node.children.forEach(objectToArr)
    }
  }
  arr.map(addnode);
  objectToArr(tree)
  return Object.values(tree)
}

