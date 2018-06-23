
import { Example, ExampleExecutionOptions, ExampleExecutionResult } from '../types';
import { printAllSourceFileAst } from './exampleUtil';
import { getFiles } from './exampleFilesManager';
import * as ts from 'typescript'
import { log } from '../ui/log';


export default class implements Example {
  id= 'tsTest1'
   name= 'tsSimple1'
    description= 'My first TypeScript API Test in the browser. Just compile a couple of typescript and a tsx file in a small project and visit its chidden printing them -  so far so good'
    execute= (options: ExampleExecutionOptions)=>{

        options.program.getSourceFiles().forEach(sourceFile => {
          log(`=== AST of ${sourceFile.isDeclarationFile ? 'Declaration File' : 'Source File'} ${sourceFile.fileName} ==`)
          visit(sourceFile, (n, level) => log(printNode(n, level)))
        })
      
    } 
  files =getFiles().filter(f=>f.fileName.includes('files/tsTranspilingProject1'))

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