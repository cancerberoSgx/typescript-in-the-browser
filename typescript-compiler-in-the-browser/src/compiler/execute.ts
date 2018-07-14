// this is responsible of executing typescript code when user clicks "execute" link - for that we need first
// to emit .js and then execute and hack require and exports in the eval

import { AbstractFile, buildCompilerOptions, getMonacoModelFor } from 'monaco-typescript-project-util';
import { CompilerOptions, getDefaultCompilerOptions, transpileModule, TranspileOutput } from 'typescript';
import { getFiles } from '../examples/exampleFilesManager';
import { getCurrentExample } from './manager';
import { Example } from './types';


export function buildExampleProjectFromEditors(): Example {
  const currentExample = getCurrentExample()
  const files = currentExample.files.filter(f => f.fileName !== currentExample.exampleSource.fileName).map(f => ({
    fileName: f.fileName,
    content: getMonacoModelFor(f).getValue()
  }))
  const exampleSourceContent = getMonacoModelFor(currentExample.exampleSource).getValue()
  const exampleSource = { fileName: currentExample.exampleSource.fileName, content: exampleSourceContent }

  const { outputText } = transpileFile(exampleSource)
  let exportsObject: any = {}
  try {
    const toEval = '(function(require, exports){\n;\n' + outputText + '\n;\n})'
    const f = eval(toEval)
    //@ts-ignore
    f.apply(this, [(window as any).__require_before_monaco, exportsObject])
  } catch (ex) {
    console.log('Error evaluating example source ', currentExample.exampleSource.fileName, ex, ex.stack)
    throw ex
  }

  let execute = (function () {
    const instance = new exportsObject.default()
    return instance.execute.bind(instance)
  })()
  return Object.assign({}, currentExample, { files, exampleSource, execute })
}

function transpileFile(file: AbstractFile): TranspileOutput {
  const text = getFiles().find(f => f.fileName === '__parent_project_tsconfig.json')
  const compilerOptions: CompilerOptions = text ? buildCompilerOptions(text.content) : getDefaultCompilerOptions()
  return transpileModule(file.content, { compilerOptions, fileName: file.fileName })
}