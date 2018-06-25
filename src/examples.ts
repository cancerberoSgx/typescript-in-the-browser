import languageService1 from './examples/languageService1';
import transformation1 from './examples/transformation1';
import tsquery1 from './examples/tsquery1';
import tsSimple1 from './examples/tsSimple1';
import tsTranspilingProject1 from './examples/tsTranspilingProject1';
import typeChecker1 from './examples/typeChecker1';
import { getDefaultLanguageServiceProvider } from './languageServiceProvider/languageServiceProviderFactory';
import { getDefaultProgramProvider } from './programProvider/programProviderFactory';
import { Example } from './types';
import { log, resetLog, resetMonacoModelsAndEditors, setMonacoTypeScriptDefaults, createAllMonacoModelsFor } from './util/uiUtil';
import loadProjectJsonTest1 from './examples/loadProjectJsonTest1';
import * as ts from 'typescript';
import { ProgramFile } from './programProvider';
import { debugFactory } from './util/util';
import { getMonaco } from './util/monacoFacade';


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
export function getCurrentExampleTsFilesOnly(): ProgramFile[] {
  return currentExampleTsSourceFilesOnly
}
export function getCurrentExample(): Example {
  return currentExample
}

export function dispatchExamples() {
  const defaultTest = examples[0].id
  const exampleId = window.location.hash.split('example=')[1] || defaultTest
  const targetExample = getExamples().find(e => e.id === exampleId)
  if(targetExample===currentExample){
    return
  }
  currentExample = targetExample
  if (!currentExample) {
    alert('cannot execute test ' + exampleId + '. Executing default one ' + defaultTest)
    currentExample = getExamples().find(e => e.id === defaultTest)
  }
  executeExample(currentExample)
}


let currentLanguageService: ts.LanguageService
export function executeExample(example: Example) {
  try {
    resetLog()
    resetMonacoModelsAndEditors()
    currentExampleTsSourceFilesOnly = example.files.filter(f => ['.ts', '.tsx'].find(ends => f.fileName.endsWith(ends))) || []
    const tsConfigFile = example.files.find(f => f.fileName === 'tsconfig.json')
    const compilerOptionsValue = tsConfigFile ? tsConfigFile.content : ts.getDefaultCompilerOptions()
    try {
    currentExampleProgram = getDefaultProgramProvider().createProgram(currentExampleTsSourceFilesOnly, compilerOptionsValue)
    } catch (error) {
      debug('Failed createProgram error: '+error + ' - '+error.stack)
    }
    try {    
      currentLanguageService = getDefaultLanguageServiceProvider().createLanguageService(example.files, compilerOptionsValue)
    } catch (error) {
      debug('Failed createLanguageService error: '+error + ' - '+error.stack)
    }
    
    const t0 = performance.now()
    setMonacoTypeScriptDefaults()

    // /heads up: we want to create all monaco models for all files always no matter if the will be displayed or not
    createAllMonacoModelsFor(currentExample) 
    
    example.execute({ program: currentExampleProgram, languageService: currentLanguageService })
    // refreshMonacoModelsAndEditors()
    lastExampleExecutionTime = performance.now() - t0
  } catch (error) {
    log('error on execute: ' + error + '\n' + error.stack)
    throw error
  }
}

let currentExampleProgram: ts.Program | undefined
export function getCurrentExampleProgram(): ts.Program | undefined {
  return currentExampleProgram
}