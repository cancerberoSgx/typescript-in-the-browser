
import * as ts from 'typescript';
import { Example , ExampleExecutionOptions } from '../types';
import { log } from '../ui/log';
import { getFiles } from './exampleFilesManager';


export default class implements Example {
  id = 'typeChecker1'
  name = 'Type Checker 1'
  description = "Walk the AST and use the type checker to serialize class information. Use the type checker to get symbol and type information, while grabbing JSDoc comments for exported classes, their constructors, and respective constructor parameters. Example adapted from TypeScript Compiler API docs"
  files = [{fileName: 'file1.ts', content: `
/**
 * Documentation for C
 */
class C {
  /**
  * constructor documentation
  * @param a my parameter documentation
  * @param b another parameter documentation
  */
  constructor(a: string, b: C) { }
}`
  }]
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
    const text = generateDocumentation(options.program)
    log(text)
  }
  
}

interface DocEntry {
  name?: string,
  fileName?: string,
  documentation?: string,
  type?: string,
  constructors?: DocEntry[],
  parameters?: DocEntry[],
  returnType?: string
};

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(program: ts.Program): string {
  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();
  let output: DocEntry[] = [];
  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, visit);
    }
  }
  return JSON.stringify(output, undefined, 4)

  /** visit nodes finding exported classes */
  function visit(node: ts.Node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
      return;
    }
    if (ts.isClassDeclaration(node) && node.name) {
      // This is a top level class, get its symbol
      let symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        output.push(serializeClass(symbol));
      }
      // No need to walk any further, class expressions/inner declarations cannot be exported
    }
    else if (ts.isModuleDeclaration(node)) {
      // This is a namespace, visit its children
      ts.forEachChild(node, visit);
    }
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
      type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!))
    };
  }

  /** Serialize a class symbol information */
  function serializeClass(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);
    // Get the construct signatures
    let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
    return details;
  }

  /** Serialize a signature (call or construct) */
  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
    };
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node: ts.Node): boolean {
    return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
  }
}



// /** creates a dummy ts.Program in memory with given source files inside */
// export function createProgram(files: {
//   fileName: string, content: string,
//   sourceFile?: ts.SourceFile
// }[], compilerOptions?: ts.CompilerOptions): ts.Program {
//   const tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json',
//     compilerOptions ? JSON.stringify(compilerOptions) : `{
//     "compilerOptions": {
//       "target": "es2018",   
//       "module": "commonjs", 
//       "lib": ["es2018"],
//       "rootDir": ".",
//       "strict": false,   
//       "esModuleInterop": true,
//     }
//   `)
//   let { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
//   if (errors.length) {
//     throw errors
//   }
//   const compilerHost = ts.createCompilerHost(options)
//   compilerHost.getSourceFile = function (fileName: string, languageVersion: ts.ScriptTarget, 
//     onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
//     const file = files.find(f => f.fileName === fileName)
//     if (!file) return undefined
//     file.sourceFile = file.sourceFile || ts.createSourceFile(fileName, file.content, ts.ScriptTarget.ES2015, true)
//     return file.sourceFile
//   }
//   // in order to typechecker to work we need to implement the following method, the following implementation is enough: 
//   compilerHost.resolveTypeReferenceDirectives = function(typeReferenceDirectiveNames: string[], containingFile: string): (ts.ResolvedTypeReferenceDirective | undefined)[] {
//     return []
//   }
//   return ts.createProgram(files.map(f => f.fileName), options, compilerHost)
// }
