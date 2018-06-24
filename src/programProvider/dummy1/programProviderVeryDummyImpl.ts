import { join } from 'path';
import * as ts from "typescript";
import { buildCompilerOptions, debugFactory } from '../../util';
import { ProgramFile, ProgramProvider } from '../index';


const debug = debugFactory('programProviderVeryDummyImpl')

/**
 * an in memory filesystem-based program provider. Very simple not ready for production just to see if we can run typescript tin the browsers
 * one instance of me manages one instance of compiler host and program 
 */
export class ProgramProviderVeryDummyImpl implements ProgramProvider {
  private program: ts.Program;
  private compilerHost: ts.CompilerHost;

  /** creates a dummy ts.Program in memory with given source files inside */
  createProgram(files: ProgramFile[], compilerOptions: ts.CompilerOptions | string): ts.Program {
    const finalCompilerOptions = buildCompilerOptions(compilerOptions)
    this.compilerHost = new CompilerHostVeryDummy(finalCompilerOptions, files)
    this.program = ts.createProgram(files.map(f => f.fileName), finalCompilerOptions, this.compilerHost)
    return this.program
  }
}

// TODO: move to separate file
export class ModuleResolutionHostVeryDummy implements ts.ModuleResolutionHost {
  constructor(protected files: ProgramFile[]) {
  }
  addFiles(files: ProgramFile[]): any {
    debug(`addFiles ${files.map(f => f.fileName).join(',')}`)
    this.files = this.files.concat(files).filter((f, i, arr) => arr.indexOf(f) === i)
  }
  fileExists(fileName: string): boolean {
    debug(`fileExists ${fileName}`)
    return !!this.files.find(f => f.fileName === fileName)
  }
  readFile(fileName: string): string | undefined {
    debug(`readFile ${fileName}`)
    const file = this.files.find(f => f.fileName === fileName)
    return !!file ? file.content : undefined
  }
  trace?(s: string): void {
    console.trace(s)
  }
  directoryExists?(directoryName: string): boolean {
    debug(`directoryExists ${directoryName}`)
    return true // TODO
  }
  /**
   * Resolve a symbolic link.
   * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
   */
  realpath?(path: string): string {
    debug(`realpath ${path}`)
    return path // TODO
  }
  getCurrentDirectory() {
    debug(`getCurrentDirectory `)
    return '' // TODO
  }

  getDirectories(path: string): string[] {
    debug(`getDirectories ${path}`)
    return [] //TODO
  }
}

// TODO:  most to a separate file
export class CompilerHostVeryDummy extends ModuleResolutionHostVeryDummy implements ts.CompilerHost {

  constructor(protected options: ts.CompilerOptions, files: ProgramFile[]) {
    super(files)
  }

  getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = this.readFile(fileName); //TODO    
    const sourceFIle = sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion, true) : undefined;
    return sourceFIle
  }
  // getSourceFileByPath?(fileName: string, path: ts.Path, languageVersion: ts.ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined{
  // }

  getDefaultLibFileName() {
    return "lib.d.ts" //TODO
  }
  // getDefaultLibLocation?(): string{
  // }

  writeFile(fileName: string, content: string) {
    debug(`writeFile ${fileName}`)
    const file = this.files.find(f => f.fileName === fileName)
    if (file) {
      file.content = content
    } else {
      this.files.push({ fileName, content })
    }
  }

  getCanonicalFileName(fileName: string) {
    debug(`getCanonicalFileName ${fileName}`) 
    return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase()
  }

  getNewLine() {
    return '\n'//TODO
  }

  useCaseSensitiveFileNames() { //TODO
    return true
  }

  resolveModuleNames(moduleNames: string[], containingFile: string, moduleSearchLocations: string[]): ts.ResolvedModule[] {
    debug(`resolveModuleNames moduleNames: ${moduleNames && moduleNames.join(',')} containingFile: ${containingFile}, moduleSearchLocations: ${moduleSearchLocations && moduleSearchLocations.join(',')}`)
    const resolvedModules: ts.ResolvedModule[] = []
    for (const moduleName of moduleNames) { //TODO
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, this.options,
        { fileExists: this.fileExists.bind(this), readFile: this.readFile.bind(this) })
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule)
      }
      else {
        for (const location of moduleSearchLocations) {
          const modulePath = join(location, moduleName + ".d.ts")
          if (this.fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath })
          }
        }
      }
    }
    debug(`resolveModuleNames result: ${resolvedModules && JSON.stringify(resolvedModules)}`)
    return resolvedModules;
  }
  // /**
  //  * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
  //  */
  // resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string): (ts.ResolvedTypeReferenceDirective | undefined)[];
  // getEnvironmentVariable?(name: string): string
  // createHash?(data: string): string;

}