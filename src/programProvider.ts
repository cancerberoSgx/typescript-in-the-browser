import * as ts from "typescript";
import { ProgramFile } from './programProvider';
// const path = require('path')

// interfaces that define basic File types, createProgram() ad createCompilerHost to isolate this part allowing execution in the browser. 
// initial IDEA / design
// WIP


/** very simple type representing data files - previously to any parsing for now just a fileName and content */
export interface ProgramFile {
  fileName: string
  content: string
}


export interface ProgramProvider{
  // createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[]): ts.CompilerHost
   createProgram(files?:ProgramFile [], compilerOptions?: ts.CompilerOptions): ts.Program
}