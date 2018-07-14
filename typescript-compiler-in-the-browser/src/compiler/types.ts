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
  
  // because monaco-editor and browserify / commonsjs don't play nice together, we are hacking ike the
  // following so we are able to eval() user's modifications. in this member we store the current example
  // execution context require function which we need to pass to the eval()
  __require: any
}
