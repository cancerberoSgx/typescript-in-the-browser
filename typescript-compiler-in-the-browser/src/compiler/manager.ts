// this is the controller - responsible of implementing / dispatches actions of the user and browser, like example selection or execution (which delegate in execute.ts)

import { createAllMonacoModelsFor, debugFactory, installTsConfig, ProjectNature, resetMonacoModelsAndEditors, setDebugEnabledFor } from 'monaco-typescript-project-util';
import * as ts from 'typescript';
import languageService1 from '../examples/languageService1';
import loadProjectJsonTest1 from '../examples/loadProjectJsonTest1';
import transformation1 from '../examples/transformation1';
import tsquery1 from '../examples/tsquery1';
import tsSimpleAst1 from '../examples/tsSimpleAst1';
import tsSimple1 from '../examples/tsSimple1';
import tsTranspilingProject1 from '../examples/tsTranspilingProject1';
import typeChecker1 from '../examples/typeChecker1';
import tsSimpleAstAndTsQueryTogether from '../examples/tsSimpleAstAndTsQueryTogether'
import { getDefaultLanguageServiceProvider } from './languageServiceProvider/languageServiceProviderFactory';
import { ProgramFile } from './programProvider';
import { getDefaultProgramProvider } from './programProvider/programProviderFactory';
import { Example, ExampleExecutionResult } from './types';
import { log, resetLog } from './util/uiUtil';
import { DEBUG, render } from './main';
import { buildExampleProjectFromEditors } from './execute';


const debug = debugFactory('manager')
setDebugEnabledFor('manager', DEBUG)

const examples = [
  new tsSimple1(),
  new tsTranspilingProject1(),
  new transformation1(),
  new tsSimpleAst1(),
  new typeChecker1(),
  new languageService1(),
  new tsquery1(),
  new loadProjectJsonTest1(),
  new tsSimpleAstAndTsQueryTogether()
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

export function dispatchExamples(exampleId: string = window.location.hash.split('example=')[1] || examples[0].id): Promise<ExampleExecutionResult> {
  const targetExample = getExamples().find(e => e.id === exampleId)
  if (targetExample === currentExample) {
    return
  }
  currentExample = targetExample
  if (!currentExample) {
    alert('cannot execute test ' + exampleId + '. Executing default one ' + examples[0].id)
    currentExample = getExamples().find(e => e.id === examples[0].id)
  }
  return executeExample(currentExample)
}
export interface ExampleExecutionResult { projectNature: ProjectNature, executionResult: void | ExampleExecutionResult }
let currentLanguageService: ts.LanguageService

export function executeExample(example: Example): Promise<ExampleExecutionResult> {
  try {
    resetLog()
    resetMonacoModelsAndEditors()
    currentExampleTsSourceFilesOnly = example.files.filter(f => ['.ts', '.tsx'].find(ends => f.fileName.endsWith(ends))) || []
    const tsConfigFile = example.files.find(f => f.fileName === 'tsconfig.json')
    const compilerOptionsValue = tsConfigFile ? tsConfigFile.content : ts.getDefaultCompilerOptions()
    try {
      currentExampleProgram = getDefaultProgramProvider().createProgram(currentExampleTsSourceFilesOnly, compilerOptionsValue)
    } catch (error) {
      debug('Failed createProgram error: ' + error + ' - ' + error.stack)
    }
    try {
      currentLanguageService = getDefaultLanguageServiceProvider().createLanguageService(example.files, compilerOptionsValue)
    } catch (error) {
      debug('Failed createLanguageService error: ' + error + ' - ' + error.stack)
    }
    const t0 = performance.now()
    return new Promise(resolve => {
      installTsConfig(example)
        .then(projectNature => {
          // heads up: we want to create all monaco models for all files always no matter if the will be displayed or not
          createAllMonacoModelsFor(currentExample)
          const executionResult = example.execute({ program: currentExampleProgram, languageService: currentLanguageService })
          lastExampleExecutionTime = performance.now() - t0
          resolve({ projectNature, executionResult })
        })

    })
  } catch (error) {
    log('error on execute: ' + error + '\n' + error.stack)
    throw error
  }
}

let currentExampleProgram: ts.Program | undefined
export function getCurrentExampleProgram(): ts.Program | undefined {
  return currentExampleProgram
}

export function dispatchExampleExecute() {
  const project = buildExampleProjectFromEditors()
  currentExample = project || currentExample
  executeExample(currentExample).then(render)
}
export function dispatchShareableUrl() {
}
