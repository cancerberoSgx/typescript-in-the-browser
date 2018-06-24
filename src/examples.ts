import languageService1 from './examples/languageService1';
import transformation1 from './examples/transformation1';
import tsquery1 from './examples/tsquery1';
import tsSimple1 from './examples/tsSimple1';
import tsTranspilingProject1 from './examples/tsTranspilingProject1';
import typeChecker1 from './examples/typeChecker1';
import { getDefaultLanguageServiceProvider } from './languageServiceProvider/languageServiceProviderFactory';
import { getDefaultProgramProvider } from './programProvider/programProviderFactory';
import { Example } from './types';
import { log, resetLog, configureMonacoTypeScriptDefaults } from './ui/uiUtil';
import loadProjectJsonTest1 from './examples/loadProjectJsonTest1';
import * as ts from 'typescript';
import { ProgramFile } from './programProvider';
import { debugFactory } from './util';


const debug = debugFactory('examples')

const examples = [
  new tsSimple1(),
  new tsTranspilingProject1(),
  new transformation1(),
  // new tsSimpleAst1()
  new typeChecker1(),
  new languageService1(),
  new tsquery1(),
  new loadProjectJsonTest1()
]
export function getExamples(): Example[] {
  return examples
}

let currentExample: Example

let currentExampleTsSourceFilesOnly: ProgramFile[] = []
export let lastExampleExecutionTime: number
// let currentExampleCompilerOptions: ts.CompilerOptions | undefined 
// export function getCurrentExampleCompilerOptions():  ts.CompilerOptions | undefined {
//   return currentExampleCompilerOptions
// }
export function getCurrentExampleTsFilesOnly(): ProgramFile[] {
  return currentExampleTsSourceFilesOnly
}


export function getCurrentExample(): Example {
  return currentExample
}
export function dispatchExamples() {
  const defaultTest = examples[0].id
  const exampleId = window.location.hash.split('example=')[1] || defaultTest
  currentExample = getExamples().find(e => e.id === exampleId)
  if (!currentExample) {
    alert('cannot execute test ' + exampleId + '. Executing default one ' + defaultTest)
    currentExample = getExamples().find(e => e.id === defaultTest)
  }
  executeExample(currentExample)
}

function executeExample(example: Example) {
  try {
    resetLog()
    currentExampleTsSourceFilesOnly = example.files.filter(f => ['.ts', '.tsx'].find(ends => f.fileName.endsWith(ends))) || []
    const tsConfigFile = example.files.find(f => f.fileName === 'tsconfig.json')
    // currentExampleCompilerOptions = undefined
    // if (tsConfigFile) {
    // try {
    // currentExampleCompilerOptions = JSON.parse(tsConfigFile.content).compilerOptions || undefined
    // debug('Using project provided tsconfig.json: \n' + tsConfigFile.content)//JSON.stringify(currentExampleCompilerOptions))
    // } catch (error) {
    //   alert('Error parsing project tsconfig.json file. json :\n' + tsConfigFile.content)
    // }
    // }
    const compilerOptionsValue = tsConfigFile ? tsConfigFile.content : ts.getDefaultCompilerOptions()
    currentExampleProgram = getDefaultProgramProvider().createProgram(currentExampleTsSourceFilesOnly, compilerOptionsValue)
    const languageService = getDefaultLanguageServiceProvider().createLanguageService(example.files, compilerOptionsValue)
    const t0 = performance.now()
    example.execute({ program: currentExampleProgram, languageService })
    lastExampleExecutionTime = performance.now() - t0
    configureMonacoTypeScriptDefaults(currentExample, currentExampleProgram)
  } catch (error) {
    log('error on execute: ' + error + '\n' + error.stack)
    throw error
  }
}

let currentExampleProgram: ts.Program | undefined
export function getCurrentExampleProgram(): ts.Program | undefined {
  return currentExampleProgram
}