// this is responsible of executing typescript code when user clicks "execute" link - for that we need first
// to emit .js and then execute and hack require and exports in the eval

import { AbstractFile, buildCompilerOptions, getMonacoModelFor } from 'monaco-typescript-project-util';
import { CompilerOptions, getDefaultCompilerOptions, transpileModule } from 'typescript';
import { getFiles } from '../examples/exampleFilesManager';
import { getCurrentExample } from './manager';
import { Example } from './types';

export function buildProjectFromEditorModels(): Example {
  const currentExample = getCurrentExample()
  const files = currentExample.files.filter(f => f.fileName !== currentExample.exampleSource.fileName).map(f => {
    return {
      fileName: f.fileName,
      content: getMonacoModelFor(f).getValue()
    }
  })
  const exampleSourceContent = getMonacoModelFor(currentExample.exampleSource).getValue()
  const exampleSource = { fileName: currentExample.exampleSource.fileName, content: exampleSourceContent }

  const transpiled = transpileFile(exampleSource)
  let exportsObject: any = {}
  // let originalRequire = (window as any)["req" + "ui" + "re"];
  try {
    const toEval = '(function(require, exports){\n;\n' + transpiled + '\n;\n})';
    // (window as any)["req" + "ui" + "re"] = (window as any).__require_before_monaco;
    const f = eval(toEval);
    //@ts-ignore
    f.apply(this, [(window as any).__require_before_monaco, exportsObject]);
  } catch (ex) {
    // (window as any)["req" + "ui" + "re"] = originalRequire;
    console.log('Error evaluating example source ', currentExample.exampleSource.fileName, ex, ex.stack)
    throw ex
  }

  let execute = (function () {
    const instance = new exportsObject.default()
    return instance.execute.bind(instance)
  })()
  return Object.assign({}, currentExample, { files, exampleSource, execute })
}

function getParentCompilerOptions(): CompilerOptions {
  const text = getFiles().find(f => f.fileName === '__parent_project_tsconfig.json')
  return text ? buildCompilerOptions(text.content) : getDefaultCompilerOptions()
}
function transpileFile(file: AbstractFile, compilerOptions: CompilerOptions = getParentCompilerOptions()): string {
  const result = transpileModule(file.content, { compilerOptions, fileName: file.fileName, moduleName: "myModule2" });
  return result.outputText
}