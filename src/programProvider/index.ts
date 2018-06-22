
// interfaces that define basic File types, createProgram() ad createCompilerHost to isolate this part allowing execution in the browser. 
// initial IDEA / design

// WIP

import * as ts from "typescript";

/** very simple type representing data files - previously to any parsing for now just a fileName and content */
export interface ProgramFile {
  fileName: string
  content: string
  isDirectory?: boolean
  isLink?: boolean
}


export interface ProgramProvider {
  createProgram(files?: ProgramFile[], compilerOptions?: ts.CompilerOptions): ts.Program
}