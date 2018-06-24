import tsSimple1 from './examples/tsSimple1';
import tsTranspilingProject1 from './examples/tsTranspilingProject1';
// import { getExamples } from './examples';
import { getDefaultBrowserProgramProvider } from './programProvider/programProviderFactory';
import { Example } from './types';
import { log, resetLog } from './ui/log';
import transformation1 from './examples/transformation1';
import typeChecker1 from './examples/typeChecker1';
// import tsSimpleAst1 from './examples/tsSimpleAst1';

const examples = [
  new tsSimple1(),
  new tsTranspilingProject1(), 
  new transformation1(), 
  // new tsSimpleAst1()
  new typeChecker1()
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
  const provider = getDefaultBrowserProgramProvider()
  const program = provider.createProgram(example.files)
  try {
    resetLog()
    const t0 = performance.now()
    example.execute({ program })
    lastExampleExecutionTime = performance.now()-t0
  } catch (error) {
    log('error on execute: ' + error + '\n' + error.stack)
  }
}

export let lastExampleExecutionTime:number