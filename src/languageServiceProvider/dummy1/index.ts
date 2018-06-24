import { LanguageServiceProvider } from '..';
import * as ts from "typescript";
import { CompilerHostVeryDummy, defaultCompilerOptions } from '../../programProvider/dummy1/programProviderVeryDummyImpl';
import { ProgramFile } from '../../programProvider';


const fileVersions: { [name: string]: { version: number } } = {};
const files: { [name: string]: ProgramFile } = {};

export class LanguageServiceProviderDummy1 implements LanguageServiceProvider {

  defaultCompilerOptions:  {
    lib: ["es2018", "dom"]
  }

  createLanguageService(programFiles: ProgramFile[], compilerOptions?: ts.CompilerOptions): ts.LanguageService {

    programFiles.forEach(f => {
      files[f.fileName] = f
      fileVersions[f.fileName] = { version: 0 }
    })

    // const options = compilerOptions ? JSON.stringify({compilerOptions}) : JSON.stringify({compilerOptions: defaultCompilerOptions})
    // ts.parseConfigFileTextToJson('tsconfig.json',
      // compilerOptions ? JSON.stringify(compilerOptions) : JSON.stringify(this.defaultCompilerOptions))
    // let { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigJson.config.compilerOptions, '.')
    // if (errors.length) {    //TODO. better errors
    //   throw errors
    // }
    const servicesHost = new LanguageServiceHostDummy1(compilerOptions || this.defaultCompilerOptions)
    const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry())
    return services
  }

}


class GetEffectiveTypeRootsHostDummy1 implements ts.GetEffectiveTypeRootsHost {
  directoryExists(directoryName: string): boolean { return true } // TODO
  getCurrentDirectory(): string { return '.' } // TODO
}


export class LanguageServiceHostDummy1 extends GetEffectiveTypeRootsHostDummy1 implements ts.LanguageServiceHost {
  constructor(private compilerOptions: ts.CompilerOptions) {
    super()
  }
  getCompilationSettings(): ts.CompilerOptions {
    return this.compilerOptions
  }
  // getNewLine?(): string {
  //   return '\n' // TODO
  // }
  // getProjectVersion?(): string {
  //   return '1.0' //TODO
  // }
  getScriptFileNames(): string[] {
    console.log('getScriptFileNames', Object.keys(files) );
    
    return Object.keys(files)
  }
  // getScriptKind?(fileName: string): ts.ScriptKind;
  getScriptVersion(fileName: string): string {
    return fileVersions[fileName] && fileVersions[fileName].version.toString()
  }
  getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {

    console.log('getScriptSnapshot', fileName );
    if (!this.fileExists(fileName)) {
      return undefined;
    }
    return ts.ScriptSnapshot.fromString(this.readFile(fileName));
  }
  // getProjectReferences?(): ReadonlyArray<ts.ProjectReference> | undefined{
  //   return undefined
  // }
  // getLocalizedDiagnosticMessages?(): any{
  //   return null
  // }
  // getCancellationToken?(): ts.HostCancellationToken{
  //   return {
  //     isCancellationRequested: ()=>false}
  //   }
  // }
  // getCurrentDirectory(): string {
  //   return '.'
  // }
  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return CompilerHostVeryDummy.prototype.getDefaultLibFileName.apply(this, arguments)
  }
  // log(s: string): void{
  //   console.log(s)
  // }
  // trace?(s: string): void;
  // error?(s: string): void;
  // useCaseSensitiveFileNames?(): boolean;
  // readDirectory?(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
  readFile(path: string, encoding?: string): string | undefined {
    console.log('readFile', path );
    return files[path] ? files[path].content : undefined
  }
  // realpath?(path: string): string;
  fileExists(path: string): boolean {
    console.log('fileExists', path );
    return !!files[path]
  }
  // getTypeRootsVersion?(): number;
  // resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ts.ResolvedModule[];
  // getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: string, containingFile: string): ts.ResolvedModuleWithFailedLookupLocations;
  // resolveTypeReferenceDirectives?(typeDirectiveNames: string[], containingFile: string): ts.ResolvedTypeReferenceDirective[];
  // getDirectories?(directoryName: string): string[];
  // /**
  //  * Gets a set of custom transformers to use during emit.
  //  */
  // getCustomTransformers?(): ts.CustomTransformers | undefined;
  // isKnownTypesPackageName?(name: string): boolean;
  // installPackage?(options: ts.InstallPackageOptions): Promise<ts.ApplyCodeActionCommandResult>;
}


