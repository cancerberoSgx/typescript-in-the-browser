
import { log } from '../ui/uiUtil';
import * as ts from 'typescript'

export function printNode(n: ts.Node, level: number = 0): string {
  const text = n.getText().replace(/[\\n\\s]+/gm, ' ')
  return `${new Array(level * 2).fill(' ').join('')}${getKindName(n.kind)} - "${text.substring(0, Math.min(text.length, 20))}`
}

export function visit(node: ts.Node, visitor: (node: ts.Node, level: number) => void, level: number = 0) {
  if (!node) {
    return;
  }
  visitor(node, level);
  node.forEachChild(child => visit(child, visitor, level + 1));
}

export function getKindName(kind: ts.SyntaxKind) {
  return (ts as any).SyntaxKind[kind];
}
export function printAllSourceFileAst(program: ts.Program, l: typeof log = log) {
  program.getSourceFiles().forEach(sourceFile => {
    l(`=== AST of ${sourceFile.isDeclarationFile ? 'Declaration File' : 'Source File'} ${sourceFile.fileName} ==`)
    visit(sourceFile, (n, level) => l(printNode(n, level)))
  })
}

// export const defaultFormatDiagnosticHost: ts.FormatDiagnosticsHost = defaultFormatDiagnosticHost