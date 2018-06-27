import * as ts from 'typescript';
import { ProgramFile } from './programProvider';
import { AbstractProject } from 'monaco-typescript-project-util';

export interface ExampleExecutionOptions {
  program: ts.Program
  languageService: ts.LanguageService
}
export interface ExampleExecutionResult {
}
export type ExampleExecute = (config: ExampleExecutionOptions) => (ExampleExecutionResult | undefined | void)


export interface Example extends AbstractProject{
  id: string
  description: string
  execute: ExampleExecute
  exampleSource: ProgramFile
}
