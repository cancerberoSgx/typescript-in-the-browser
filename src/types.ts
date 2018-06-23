import * as ts from 'typescript';
import { ProgramFile } from './programProvider';

export interface ExampleExecutionOptions {
  program: ts.Program
}
export interface ExampleExecutionResult {
}
export type ExampleExecute = (config: ExampleExecutionOptions) => (ExampleExecutionResult | undefined | void)
export interface Example {
  name: string
  id: string
  description: string
  execute: ExampleExecute
  files: ProgramFile[]
}
