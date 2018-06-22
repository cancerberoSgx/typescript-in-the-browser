import * as ts from "typescript";
import { ProgramFile, ProgramProvider } from './programProvider';
import { join } from 'path';

//TDO: declare compilerHost in a separate class
// make it extend ModuleResolutionHost that we also implement in another class

/**
 * an in memory filesystem-based program provider. Very simple not ready for production just to see if we can run typescricp tin the browsers
 */
export class ProgramProviderVeryDummyImpl implements ProgramProvider {
  // files: ProgramFile[]= [];
  program: ts.Program;
  defaultCompilerOptions: {compilerOptions: ts.CompilerOptions} = {
    compilerOptions: {
      // target: ts.ScriptTarget.ES2018, 
      // module: ts.ModuleKind.CommonJS,
      lib: ["es2018", "dom"]
    }
  };
  compilerHost: ts.CompilerHost;
  tsConfigJson: any; 

  /** creates a dummy ts.Program in memory with given source files inside */
  createProgram(files: ProgramFile[], compilerOptions?: ts.CompilerOptions): ts.Program {
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
  constructor( protected files: ProgramFile[]){
  }
  addFiles(arg0: ProgramFile[]): any {
    this.files = this.files.concat(arg0)//TODO
  }
  fileExists(fileName: string): boolean {
    return true //TODO
  }
  readFile(fileName: string): string | undefined {
    return this.files[0].content //TODO
  }
}


class CompilerHostVeryDummy extends ModuleResolutionHostVeryDummy implements ts.CompilerHost{
  constructor(protected options: ts.CompilerOptions, files: ProgramFile[]){
    super(files)
  }
  getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
    const sourceText = this.readFile(fileName); //TODO    
    const sourceFIle = sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion, true) : undefined;
    return sourceFIle
  }
  getDefaultLibFileName() {return "lib.d.ts"}
  writeFile (fileName, content)  { this.files[0].content = content }
  getCurrentDirectory () {return  '.'}
  getDirectories (path)  {return []}
  getCanonicalFileName (fileName) {return fileName}
  getNewLine () {return '\n'}
  useCaseSensitiveFileNames () {return  true}
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