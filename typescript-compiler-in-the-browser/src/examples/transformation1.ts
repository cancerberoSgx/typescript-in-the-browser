
import * as ts from 'typescript';
import { Example , ExampleExecutionOptions } from '../compiler/types';
import { log } from '../compiler/util/uiUtil';
import { getFiles } from './exampleFilesManager';


// this example will create a simple typescript source file programmatically, parse it to AST Nodes and then 
// use TypeScript Transformations to manipulate some ot its nodes (changing  particular arithmetic expressions). 
// Finally , the transformed AST will be printed back to another source file as a string

// (Note: I've taken this example from somewhere else some credits are not mine - but since there's limited typescript 
// documentation I think is a good idea to duplicate this... )


export default class implements Example {
  id = 'transformation1'
  name = 'Transformation 1'
  description = "Example of using TypeScript Transformation API. See comments in the code for details"
  files = getFiles().filter(f => f.fileName.includes(`files/${this.id}`))
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => 
    options.program.getSourceFiles().forEach(transformSourceFile)
  
}

function transformSourceFile(sourceFile: ts.SourceFile) {

  // Apply transformation to the sourcefile 
  const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(
    sourceFile, [transformer]
  )
  // obtain the transformed source file
  const transformedSourceFile: ts.SourceFile = result.transformed[0]
  const printer: ts.Printer = ts.createPrinter()

  const transformedContent = printer.printFile(transformedSourceFile)

  log('// Original file:\n' + printer.printFile(sourceFile) + '\n// Transformed file:\n' + transformedContent)

  result.dispose()
  return transformedContent
}


// Now the interesting part, we will build a Transformation that will replace particular nodes of 
// the AST, BinaryExpressions like a+b, and replace them with with the number literal resulting 
// of applying the mathematical operation. In this case the expression "1 + 1 + 3" will be replaced 
// with the expression "6"
const transformer = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {

  // visit() function will visit all the descendants node (recursively)  
  function visit(node: ts.Node): ts.Node {
    node = ts.visitEachChild(node, visit, context)

    // Here we filter which node we want to manipulate / replace, in our case binary expressions
    if (ts.isBinaryExpression(node)) {

      if (node.left.kind === ts.SyntaxKind.NumericLiteral &&
        node.right.kind === ts.SyntaxKind.NumericLiteral) {
        const left = node.left as ts.NumericLiteral
        const leftVal = parseFloat(left.text)
        const right = node.right as ts.NumericLiteral
        const rightVal = parseFloat(right.text)
        switch (node.operatorToken.kind) {
          case ts.SyntaxKind.PlusToken:

            // Important, returning another node will replace the original "node" with returned one. 
            // In our case we will be replacing binary expressions like 1.2 with the actual result of 
            // the operaton (as long as operands are literals)
            return ts.createLiteral(leftVal + rightVal)
          case ts.SyntaxKind.AsteriskToken:
            return ts.createLiteral(leftVal * rightVal)
          case ts.SyntaxKind.MinusToken:
            return ts.createLiteral(leftVal - rightVal)
        }
      }
    }
    // for all the other kind of nodes, we just return the node (no transformation or replacement)
    return node
  }
  return ts.visitNode(rootNode, visit)
}