import * as ts from "typescript";
import {  ProgramProvider, ProgramFile } from './index';
import { join } from 'path';



//TDO: declare compilerHost in a separate class
// make it extend ModuleResolutionHost that we also implement in another class

/**
 * an in memory filesystem-based program provider. Very simple not ready for production just to see if we can run typescricp tin the browsers
 * one instance of me manages one instance of compiler host and program 
 */
export class ProgramProviderVeryDummyImpl implements ProgramProvider {
  private program: ts.Program;
  private compilerHost: ts.CompilerHost;
  tsConfigJson: any;

  defaultCompilerOptions: { compilerOptions: ts.CompilerOptions } = {
    compilerOptions: {
      // target: ts.ScriptTarget.ES2018, 
      // module: ts.ModuleKind.CommonJS,
      lib: ["es2018", "dom"]
    }
  }
  /** creates a dummy ts.Program in memory with given source files inside */
  createProgram(files: ProgramFile[], compilerOptions?: ts.CompilerOptions): ts.Program {
    // debugger;
    this.tsConfigJson = ts.parseConfigFileTextToJson('tsconfig.json',
      compilerOptions ? JSON.stringify(compilerOptions) : JSON.stringify(this.defaultCompilerOptions))
    let { options, errors } = ts.convertCompilerOptionsFromJson(this.tsConfigJson.config.compilerOptions, '.')
    //TODO. better errors
    if (errors.length) {
      throw errors
    }
    this.compilerHost = new CompilerHostVeryDummy(options, files)
    this.program = ts.createProgram(files.map(f => f.fileName), options, this.compilerHost)
    return this.program
  }
}

class ModuleResolutionHostVeryDummy implements ts.ModuleResolutionHost {
  constructor(protected files: ProgramFile[]) {
  }
  addFiles(arg0: ProgramFile[]): any {
    //TODO
    this.files = this.files.concat(arg0).filter((f, i, arr) => arr.indexOf(f) === i)
  }
  fileExists(fileName: string): boolean {
    return !!this.files.find(f=>f.fileName===fileName)
  }
  readFile(fileName: string): string | undefined {
    const file = this.files.find(f=>f.fileName===fileName)
    return !!file ? file.content :undefined
  }
  trace?(s: string): void {
    console.trace(s)
  }
  directoryExists?(directoryName: string): boolean {
    return true // TODO
  }
  /**
   * Resolve a symbolic link.
   * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
   */
  realpath?(path: string): string {
    return path // TODO
  }
  getCurrentDirectory() {
    return '.' // TODO
  }

  getDirectories(path: string) : string[]{
    return [] //TODO
  }
}
class CompilerHostVeryDummy extends ModuleResolutionHostVeryDummy implements ts.CompilerHost {
  constructor(protected options: ts.CompilerOptions, files: ProgramFile[]) {
    super(files)
  }
  getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = this.readFile(fileName); //TODO    
    const sourceFIle = sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion, true) : undefined;
    return sourceFIle
  }

  getDefaultLibFileName() { 
    return "lib.d.ts" //TODO
  }

  writeFile(fileName: string, content: string) { 
    const file = this.files.find(f=>f.fileName===fileName)
    if(file){
      file.content = content
    }
  }

  getCanonicalFileName(fileName: string) {//TODO
     return fileName 
  }

  getNewLine() { 
    return '\n'//TODO
   }

  useCaseSensitiveFileNames() { //TODO
    return true 
  }

  readFileresolveModuleNames(moduleNames: string[], containingFile: string, moduleSearchLocations: string[]): ts.ResolvedModule[] {
    const resolvedModules: ts.ResolvedModule[] = [];
    for (const moduleName of moduleNames) { //TODO
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, this.options, { fileExists: this.fileExists.bind(this), readFile: this.readFile.bind(this) });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      }
      else {
        for (const location of moduleSearchLocations) {
          const modulePath = join(location, moduleName + ".d.ts");
          if (this.fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath });
          }
        }
      }
    }
    return resolvedModules;
  }

}