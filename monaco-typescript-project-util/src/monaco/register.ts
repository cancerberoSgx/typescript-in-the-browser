/**
 * this file administer opened editors and models globally and rresponsible of disposing / register them and some notifications
 */
import { EventEmitter } from 'events';
import * as monaco from 'monaco-editor';
import { AbstractFile, AbstractProject } from '../types';
import { getMonaco } from './monacoFacade';

// monaco editor models to files conversion helpers
export function getMonacoUriFromFile(file: AbstractFile | string) {
  return getMonaco().Uri.file(typeof file === 'string' ? file : file.fileName)
}
export function uriToFileName(uri: monaco.Uri) {
  return uri.fsPath
}

export function getMonacoModelFor(file: AbstractFile): monaco.editor.IModel {
  if (!file) {
    return getMonaco().editor.createModel('')
  }
  const uri = getMonacoUriFromFile(file)
  let model = getMonaco().editor.getModels().find(m => m.uri.toString() === uri.toString())
  if (model) {
    return model
  }
  model = getMonaco().editor.createModel(file.content, undefined, uri)
  emitter.emit('modelRegistered', model, file)
  return model
}

export function setMonacoTypeScriptDefaults() {
  getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: 'src',
    module: getMonaco().languages.typescript.ModuleKind.CommonJS,
    moduleResolution: getMonaco().languages.typescript.ModuleResolutionKind.NodeJs
  })
}
const editors: monaco.editor.ICodeEditor[] = []

export const emitter = new EventEmitter()
export function registerEditor(editor: monaco.editor.ICodeEditor) {
  if (!editors.find(ed => ed === editor)) {
    editors.push(editor)
    emitter.emit('editorRegistered', editor)
  }
}
// TODO: find a way of restarting tsserver
export function resetMonacoModelsAndEditors():void {
  getMonaco().editor.getModels().forEach(model => model.dispose())
  editors.forEach(editor => editor.dispose())
}
export function createAllMonacoModelsFor(example: AbstractProject): void {
  example.files.forEach(file => {
    getMonacoModelFor(file)
  })
}

