
import * as ts from "typescript";


export interface LanguageServiceProvider {
  createLanguageService(files: any[], compilerOptions: ts.CompilerOptions): ts.LanguageService
}