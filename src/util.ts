const DEBUG = false
export function debugFactory(componentName: string): Debug {
  return function debug(m: string) {
    if (DEBUG) {
      console.log(`${componentName} debug: ${m}`)
    }
  }
}

export type Debug = (m: string) => void



import * as ts from "typescript";
import { join } from 'path';
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





// export function resolveModuleNames(opts: {moduleNames: string[], containingFile: string, moduleSearchLocations: string[], fileExists: (fileName: string)=> boolean, readFile : (fileName: string)=>( string | undefined ), compilerOptions: ts.CompilerOptions}):  ts.ResolvedModule[]  {
//   const resolvedModules: ts.ResolvedModule[] = [];
//   for (const moduleName of opts.moduleNames) { 
//     // try to use standard resolution
//     let result = ts.resolveModuleName(moduleName, opts.containingFile, opts.compilerOptions, { fileExists: , readFile });
//     if (result.resolvedModule) {
//       resolvedModules.push(result.resolvedModule);
//     }
//     else {
//       for (const location of moduleSearchLocations) {
//         const modulePath = join(location, moduleName + ".d.ts");
//         if (fileExists(modulePath)) {
//           resolvedModules.push({ resolvedFileName: modulePath });
//         }
//       }
//     }
//   }
//   return resolvedModules;
// }