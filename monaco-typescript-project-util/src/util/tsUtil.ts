
import * as ts from "typescript";

/** a facade for obtaining ts implementation without loading typescript.js - like in a monaco-editor environment where the typescriptService.js is already loaded */
export function getTs(): typeof ts {
  return (window as any).ts
}

export const defaultFormatDiagnosticHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName(fileName: string) { return fileName },
  getCurrentDirectory() { return '' },
  getNewLine() { return '\n' }
}

export function buildCompilerOptions(compilerOptions: ts.CompilerOptions | string): ts.CompilerOptions {
  let finalCompilerOptions: ts.CompilerOptions | undefined
  const ts = getTs()
  if (typeof compilerOptions === 'string') {
    const tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json', compilerOptions)
    if (tsConfigJson.error) {
      console.log('ts.parseConfigFileTextToJson ERROR: ' + tsConfigJson.error)
      throw tsConfigJson.error
    }
    let { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
    if (errors && errors.length) {    //TODO. better errors
      throw errors
    }
    finalCompilerOptions = options
  } else {
    finalCompilerOptions = compilerOptions
  }
  return finalCompilerOptions
}

export function tsLoaded(): Promise<typeof ts> {
  const predicate = () => getTs() && getTs().createLanguageService
  return new Promise(resolve => {
    if (predicate()) {
      resolve(getTs())
    }
    else {
      const timer = setInterval(() => {
        if (predicate()) {
          clearInterval(timer)
          resolve(getTs())
        }
      }, 100)
    }
  })
}