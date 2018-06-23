import tsSimple1 from './examples/tsSimple1'
import * as ts from 'typescript'
import { getDefaultBrowserProgramProvider } from './programProvider/programProviderFactory'
import { ProgramFile } from './programProvider'
import { getFiles } from './examples/exampleFilesManager';
// import {ProgramFile} from

export interface ExampleExecutionOptions {
  program: ts.Program
}
export interface ExampleExecutionResult {
}
export type ExampleExecute = (config: ExampleExecutionOptions) => (ExampleExecutionResult|undefined|void)
export interface Example {
  name: string
  id: string
  description: string
  execute: ExampleExecute
  files: ProgramFile[]
}
// export abstract class AbstractExample implements Example {
//   abstract id: string 
//   abstract name: string
//   abstract description: string
//   abstract execute: ExampleExecute
//   files = getFiles().filter(f=>f.fileName.includes(this.id))
// }


import tsTranspilingProject1 from './examples/tsTranspilingProject1';
const defaultTest = 'tsTest1'
const examples = [
  new tsSimple1(), 
  new tsTranspilingProject1()
]
export function getExamples(): Example[] {
  return examples
}
// export ProgramFile from 

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



// import { getFileContent } from './examples/exampleFilesManager';

// getFileContent()
// log('FILEEEE: '+getFileContent('tsTranspilingProject1.ts'))