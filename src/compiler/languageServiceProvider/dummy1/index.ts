import { join } from 'path';
import * as ts from "typescript";
import { LanguageServiceProvider } from '..';
import { ProgramFile } from '../../programProvider';
import { CompilerHostVeryDummy } from '../../programProvider/dummy1/programProviderVeryDummyImpl';
import { debugFactory } from '../../../common/util/util';
import { buildCompilerOptions } from '../../../common/util/tsUtil';


const debug = debugFactory('LanguageServiceProviderDummyImpl')
const fileVersions: { [name: string]: { version: number } } = {};
const files: { [name: string]: ProgramFile } = {};

export class LanguageServiceProviderDummy1 implements LanguageServiceProvider {

  createLanguageService(programFiles: ProgramFile[], compilerOptions: ts.CompilerOptions | string): ts.LanguageService {
    programFiles.forEach(f => {
      files[f.fileName] = f
      fileVersions[f.fileName] = { version: 0 }
    })
    const finalCompilerOptions = buildCompilerOptions(compilerOptions)
    const servicesHost = new LanguageServiceHostDummy1(finalCompilerOptions) // || this.defaultCompilerOptions
    const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())
    return services
  }
}


export class LanguageServiceHostDummy1 implements ts.LanguageServiceHost {
  constructor(private compilerOptions: ts.CompilerOptions) {
  }
  getCompilationSettings(): ts.CompilerOptions {
    return this.compilerOptions
  }
  getNewLine?(): string {
    return '\n' // TODO
  }
  getScriptFileNames(): string[] {
    debug('getScriptFileNames ' + Object.keys(files).join(','));
    return Object.keys(files)
  }
  // getScriptKind?(fileName: string): ts.ScriptKind;
  getScriptVersion(fileName: string): string {
    return fileVersions[fileName] && fileVersions[fileName].version.toString()
  }
  getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
    debug('getScriptSnapshot: ' + fileName);
    if (!this.fileExists(fileName)) {
      return undefined;
    }
    return ts.ScriptSnapshot.fromString(this.readFile(fileName));
  }
  getCurrentDirectory(): string {
    return ''
  }
  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return CompilerHostVeryDummy.prototype.getDefaultLibFileName.apply(this, arguments)
  }
  log(s: string): void {
    debug('LanguageServiceDummy1' + s)
  }
  trace?(s: string): void {
    console.trace('LanguageServiceDummy1' + s)
  }
  error?(s: string): void {

    console.error('LanguageServiceDummy1' + s)
  }
  useCaseSensitiveFileNames?(): boolean {
    return true
  }
  readFile(path: string, encoding?: string): string | undefined {
    debug('readFile: ' + path);
    return files[path] ? files[path].content : undefined
  }
  realpath(path: string): string {
      //  ts.ser
    debug('realpath: ' + path);
    return path
  }
  fileExists(path: string): boolean {
    debug('fileExists: ' + path);
    return !!files[path]
  }
  directoryExists(path: string): boolean { 
    debug('directoryExists: ' + path);
    return true 
  } // TODO
// normalizePath
  resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ts.ResolvedModule[] {
    try {
      
  
    debug(`resolveModuleNames moduleNames: ${moduleNames && moduleNames.join(',')} containingFile: ${containingFile}, reusedNames: ${reusedNames && reusedNames.join(',')}`)
    const resolvedModules: ts.ResolvedModule[] = [];
    for (const moduleName of moduleNames) {
      // try to use standard resolution
      let result = ts.resolveModuleName(moduleName, containingFile, this.compilerOptions, { fileExists: this.fileExists.bind(this), readFile: this.readFile.bind(this) });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      }
      else {
        // debugger;
        const moduleSearchLocations = reusedNames&& reusedNames.length ? reusedNames : [this.getCurrentDirectory()]
        for (const location of moduleSearchLocations) {
          const modulePath = join(location, moduleName + ".d.ts");
          if (this.fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath });
          }
        }
      }
    }
    debug(`resolveModuleNames result: ${resolvedModules && JSON.stringify(resolvedModules)}`)
    return resolvedModules;
  } catch (error) {
    debugger
  }
  }

  // readDirectory?(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
  // getTypeRootsVersion?(): number;
  // getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: string, containingFile: string): ts.ResolvedModuleWithFailedLookupLocations;
  // resolveTypeReferenceDirectives?(typeDirectiveNames: string[], containingFile: string): ts.ResolvedTypeReferenceDirective[];
  // getDirectories?(directoryName: string): string[];
  // /**
  //  * Gets a set of custom transformers to use during emit.
  //  */
  // getCustomTransformers?(): ts.CustomTransformers | undefined;
  // isKnownTypesPackageName?(name: string): boolean;
  // installPackage?(options: ts.InstallPackageOptions): Promise<ts.ApplyCodeActionCommandResult>;
  // getProjectReferences?(): ReadonlyArray<ts.ProjectReference> | undefined{
  //   return undefined
  // }
  // getLocalizedDiagnosticMessages?(): any{
  //   return null
  // }
  // getProjectVersion?(): string {
  //   return '1.0' //TODO
  // }
  getCancellationToken?(): ts.HostCancellationToken { // TODO
    return {
      isCancellationRequested: () => false
    }
  }

}


