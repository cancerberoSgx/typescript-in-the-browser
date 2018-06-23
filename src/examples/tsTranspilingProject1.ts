
import { ExampleExecutionOptions, ExampleExecutionResult, Example/* , AbstractExample */ } from '../types';
import { printAllSourceFileAst, defaultFormatDiagnosticHost } from './exampleUtil'
import * as ts from 'typescript';
import { log } from '../ui/log';
import { getFiles } from './exampleFilesManager';


export default class implements Example {
  id = 'tsTranspilingProject1'
  name = 'transpile project'
  description = "Transpile projects using TypeScript compiler API including a .tsx"
  files = getFiles().filter(f => f.fileName.includes(this.id))
  execute = (options: ExampleExecutionOptions) => {
    const transpileOptions: ts.TranspileOptions = {
      reportDiagnostics: true, moduleName: "tsTranspilingProject1",
      compilerOptions: {
        target: ts.ScriptTarget.ES5, 
        module: ts.ModuleKind.AMD,
        jsx: ts.JsxEmit.React,
        jsxFactory: "React.createElement"
      }
    }
    const text = options.program.getSourceFiles().map(f => {
      let result
      try {
        result = {
          fileName: f.fileName,
          transpiled: ts.transpileModule(f.getText(), transpileOptions)
        }
      } catch (error) {
        log(`Error transpiling file ${f.fileName}: ` + error.toString())
      }
      return result
    }
    ).map(res => `
==== ${res.fileName} transpile results: ====

${res.transpiled.outputText}

-- Diagnostics for ${res.fileName} transpile: --
${res.transpiled.diagnostics && ts.formatDiagnostics(res.transpiled.diagnostics, defaultFormatDiagnosticHost)}
    `).join('\n')

    log(text);
  }
}