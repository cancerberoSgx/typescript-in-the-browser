const DEBUG = true
export function debugFactory(componentName: string): Debug {
  return function debug(m: string) {
    if (DEBUG) {
      console.log(`${componentName} debug: ${m}`)
    }
  }
}
export type Debug = (m: string) => void




import * as ts from "typescript";
export function buildCompilerOptions(compilerOptions: ts.CompilerOptions|string) {
  let finalCompilerOptions: ts.CompilerOptions|undefined
  if(typeof compilerOptions==='string'){      
    const tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json',compilerOptions)
    if(tsConfigJson.error){
      console.log('ts.parseConfigFileTextToJson ERROR: '+tsConfigJson.error)
      throw tsConfigJson.error
    }
    let { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
    if (errors && errors.length) {    //TODO. better errors
      throw errors
    }
    finalCompilerOptions = options
  }else {
    finalCompilerOptions = compilerOptions
  }
  return finalCompilerOptions
}

export const defaultFormatDiagnosticHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName(fileName: string) { return fileName },
  getCurrentDirectory() { return '.' },
  getNewLine() { return '\n' }
}




// import { ProgramFile } from '../programProvider';