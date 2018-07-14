import { tsquery } from '@phenomnomnominal/tsquery';
import { ok } from 'assert';
import Project, { FunctionDeclaration, Node, ParameterDeclaration } from 'ts-simple-ast';
import { Example, ExampleExecutionOptions } from '../compiler/types';
import { log } from '../compiler/util/uiUtil';
import { getFiles } from './exampleFilesManager';


const execute = (options: ExampleExecutionOptions) => {
  const project = new Project({ useVirtualFileSystem: true })
  const sourceFile = project.createSourceFile(tsSimpleAstAndTsQueryTogetherInputFile.fileName, tsSimpleAstAndTsQueryTogetherInputFile.content)

  let f = queryOne<FunctionDeclaration>(sourceFile, functionDeclarationReturningTypeQuery({ type: 'Person' }))
  assertIncludes(f.getText(), `function f(n: number, p: Person): Person`)

  f.addParameter({ name: 'a', type: 'Person[][]' })
  f = queryOne<FunctionDeclaration>(sourceFile, functionDeclarationReturningTypeQuery({ type: 'Person' }))
  assertIncludes(f.getText(), `function f(n: number, p: Person, a: Person[][]): Person`)

  const paramA = queryOne<ParameterDeclaration>(f, parameterQuery({ name: 'a', type: 'Person' }))
  assertIncludes(paramA.getText(), `a: Person[][]`)
  log(sourceFile.getText())
}




function query<T extends Node = Node>(node: Node, q: string): T[] {
  // https://gist.github.com/dsherret/826fe77613be22676778b8c4ba7390e7
  return tsquery(node.compilerNode, q)
    .map(n => ((node as any).getNodeFromCompilerNode(n) as T))
}

function queryOne<T extends Node = Node>(node: Node, q: string): T | undefined {
  const results = query<T>(node, q)
  return results.length ? results[0] : undefined
}

const parameterQuery = ({ name, type }: { name: string, type: string }) => `Parameter:has(Parameter>Identifier[name="${name}"]):has(Parameter>ArrayType>ArrayType>${typeQuery({ type })})`

const typeQuery = ({ type }: { type: string }) => `TypeReference>Identifier[name="${type}"]`

const functionDeclarationReturningTypeQuery = ({ type }: { type: string }) => `FunctionDeclaration:has(FunctionDeclaration>${typeQuery({ type })})`

const assertIncludes = (a: any, b: any, msg: string = `Expected ${JSON.stringify(a)} to include ${JSON.stringify(b)}`) => ok(a.includes(b), msg)



const tsSimpleAstAndTsQueryTogetherInputFile = {
  fileName: 'tsSimpleAstAndTsQueryTogether/input1.ts',
  content: `interface Person { }
function f(n: number, p: Person): Person { return null }
function g(n: Person): Person[] { return null }`
}


export default class implements Example {
  execute = execute
  id = 'tsSimpleAstAndTsQueryTogether'
  name = 'ts-simple-ast and tsquery together'
  description = "use tsquery and ts-simple-ast together. Be able to query nodes using tsquery but in a ts-simple-ast Project/Node"
  files = [tsSimpleAstAndTsQueryTogetherInputFile]
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
}
