import tsSimple1 from './examples/tsSimple1';
import tsTranspilingProject1 from './examples/tsTranspilingProject1';
// import { getExamples } from './examples';
import { getDefaultProgramProvider } from './programProvider/programProviderFactory';
import { Example } from './types';
import { log, resetLog } from './ui/log';
import transformation1 from './examples/transformation1';
import typeChecker1 from './examples/typeChecker1';
import { getDefaultLanguageServiceProvider } from './languageServiceProvider/languageServiceProviderFactory';
import languageService1 from './examples/languageService1';
// import tsSimpleAst1 from './examples/tsSimpleAst1';

const examples = [
  new tsSimple1(),
  new tsTranspilingProject1(), 
  new transformation1(), 
  // new tsSimpleAst1()
  new typeChecker1(), 
  new languageService1()
]
export function getExamples(): Example[] {
  return examples
}

let example:Example
export function getCurrentExample():Example{
return example
}
export function dispatchExamples() {
  const defaultTest = examples[0].id
  const exampleId = window.location.hash.split('example=')[1] ||defaultTest
  example = getExamples().find(e => e.id === exampleId)
  if (!example) {
    alert('cannot execute test ' + exampleId + '. Executing default one ' + defaultTest)
    example = getExamples().find(e => e.id === defaultTest)
  }
  try {
    resetLog()
    const program = getDefaultProgramProvider().createProgram(example.files) // TODO: pass example project's ts-config in options
    const languageService = getDefaultLanguageServiceProvider().createLanguageService(example.files, {lib: []})  
    const t0 = performance.now()
    example.execute({ program, languageService })
    lastExampleExecutionTime = performance.now()-t0
  } catch (error) {
    log('error on execute: ' + error + '\n' + error.stack)
  }
}

export let lastExampleExecutionTime:number