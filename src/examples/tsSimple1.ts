
import { log } from '../ui/log';
import * as ts from 'typescript'
import { ProgramFile } from '../programProvider/index';
import { ExampleExecutionOptions, ExampleExecutionResult, Example } from '../test';


export default class implements Example {
  id= 'tsTest1'
   name= 'tsSimple1'
    description= 'My first TypeScript API Test in the browser -  so far so good'
    execute= (options: ExampleExecutionOptions): ExampleExecutionResult=>{
     
      printAllSourceFileAst(options.program)
      return null
    } 
  // Build a program using the set of root file names in fileNames
  files = [
    {
  fileName: 'list66.tsx', content: `
import React from 'react';
export const list33 = (arr: string[]) => 
(<ul>
  <li>{arr.map(i=>i)}</li>
</ul>)  `
    },
    {
      fileName: 'file1.ts', content: `
class C {
  constructor(a: string, b: C) { }
} `},
    {
      fileName: 'file2.ts', content: `
class Dsd extends C {
constructor(a: string, b: Date[]) { 
  super(a, this)
}}`}, 
  ]

}


function printNode(n: ts.Node, level: number = 0): string {
  const text = n.getText().replace(/[\\n\\s]+/gm, ' ')
  return `${new Array(level * 2).fill(' ').join('')}${getKindName(n.kind)} - "${text.substring(0, Math.min(text.length, 20))}`
}


function visit(node: ts.Node, visitor: (node: ts.Node, level: number) => void, level: number = 0) {
  if (!node) {
    return;
  }
  visitor(node, level);
  node.forEachChild(child => visit(child, visitor, level + 1));
}

function getKindName(kind: ts.SyntaxKind) {
  return (ts as any).SyntaxKind[kind];
}
function printAllSourceFileAst(program: ts.Program, l: typeof log = log) {
  program.getSourceFiles().forEach(sourceFile => {
    l(`=== AST of ${sourceFile.isDeclarationFile ? 'Declaration File' : 'Source File'} ${sourceFile.fileName} ==`)
    visit(sourceFile, (n, level) => l(printNode(n, level)))
  })
}
