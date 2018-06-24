
import * as ts from 'typescript';
import { Example, ExampleExecutionOptions } from '../types';
import { log } from '../ui/uiUtil';
import { getFiles } from './exampleFilesManager';

export default class implements Example {
  id = 'tsSimple1'
  name = 'Simple: Show AST'
  description = 'My first TypeScript API Test in the browser. Just compile a couple of typescript and a tsx file in a small project and visit its chidden printing them -  so far so good'
  files = getFiles().filter(f => f.fileName.includes('files/tsTranspilingProject1')) // use tsTranspilingProject1's files
  exampleSource = getFiles().find(f => f.fileName.includes('examples/tsSimple1'))
  execute = (options: ExampleExecutionOptions) => {
    options.program.getSourceFiles().forEach(sourceFile => {
      log(`=== AST of ${sourceFile.isDeclarationFile ? 'Declaration File' : 'Source File'} ${sourceFile.fileName} ==`)
      visit(sourceFile, (n, level) => log(printNode(n, level)))
    })
  }
}

// we copy & paste this functions here from exampleUtil.ts because in this simple example they are relevant

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