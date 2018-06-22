import tsSimple1 from './examples/tsSimple1'
import * as ts from 'typescript'
import { getDefaultBrowserProgramProvider } from './programProvider/programProviderFactory'
import { ProgramFile } from '../dist/src/programProvider/programProvider';



export interface ExampleExecutionOptions {
  program: ts.Program
}
export interface ExampleExecutionResult {
}
export type ExampleExecute = (config: ExampleExecutionOptions) => ExampleExecutionResult
export interface Example {
  name: string
  id: string
  description: string
  execute: ExampleExecute
  files: ProgramFile[]
}

export function getExamples(): Example[] {
  return examples
}

const defaultTest = 'tsTest1'
const examples = [
  new tsSimple1()
]
const exampleId = new URL(location.href).searchParams.get("example") || defaultTest
const found = examples.find(e => e.id === exampleId)
if (found) {
  const provider = getDefaultBrowserProgramProvider()
  const program = provider.createProgram(found.files)
  found.execute({ program })
}
else {
  alert('cannot execute test ' + exampleId)
}
