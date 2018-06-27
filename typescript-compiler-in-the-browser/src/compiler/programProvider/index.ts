
// interfaces that define basic File types, createProgram() ad createCompilerHost to isolate this part allowing execution in the browser. 
// initial IDEA / design

// WIP

import * as ts from "typescript";
import { AbstractFile } from 'monaco-typescript-project-util';
/** very simple type representing data files - previously to any parsing for now just a fileName and content */
export interface ProgramFile extends AbstractFile {
  isLink?: boolean
}


export interface ProgramProvider {
  createProgram(files?: ProgramFile[], compilerOptions?: ts.CompilerOptions): ts.Program
}