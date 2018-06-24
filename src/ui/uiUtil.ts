
// log

const lines:string[] = []
export function log(...args:any[]){
  const line = args.join(' ') + '\n'
  lines.push(line)
}
export function resetLog(){
  lines.length = 0
}
export function getLogLines():string[]{
  return lines
}



// monaco-editor hacks and types

import * as ts from 'typescript';
import * as monacoEditor from 'monaco-editor'
import { Example } from '../types';
export function monaco(): typeof monacoEditor {
  return (window as any).monaco
}
export const requireMonaco = (window as any).RequireMonaco as (fn: () => void) => void



// configure monaco.languages.typescripttypescriptDefaults for a new example
export function configureMonacoTypeScriptDefaults(example: Example, program: ts.Program){

}
    // monaco().languages.typescript.typescriptDefaults.setCompilerOptions(
      // getCurrentExampleProgram().getCompilerOptions() as any)

  // monaco().languages.typescript.typescriptDefaults.addExtraLib()