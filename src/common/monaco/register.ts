import * as monaco from 'monaco-editor'
import { AbstractFile, AbstractProject } from '../types';
import { getMonaco } from './monacoFacade';
import { EventEmitter } from 'events';

// monaco editor models to files conversion helpers
export function getMonacoUriFromFile(file: AbstractFile|string){
  return getMonaco().Uri.file(typeof file==='string' ? file : file.fileName)//'/home/sg/project1/'+file.fileName)
}
export function uriToFileName(uri: monaco.Uri){
  return uri.fsPath
}

export function getMonacoModelFor(file?: AbstractFile): monaco.editor.IModel {
  if(!file){
    return getMonaco().editor.createModel('')
  }
  const uri = getMonacoUriFromFile(file)
  let model = getMonaco().editor.getModels().find(m=>m.uri.toString()===uri.toString())
  if(model){
    return model
  }
  return getMonaco().editor.createModel(file.content, undefined, uri)
}

export function setMonacoTypeScriptDefaults(){
  getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: 'src', 
    module: getMonaco().languages.typescript.ModuleKind.CommonJS, 
    moduleResolution: getMonaco().languages.typescript.ModuleResolutionKind.NodeJs
  })
} 
const editors: monaco.editor.ICodeEditor[] = []

export const editorRegisterEmitter = new EventEmitter()
export function registerEditor(editor: monaco.editor.ICodeEditor){
  if(!editors.find(ed=>ed===editor)){
    editors.push(editor)
    editorRegisterEmitter.emit('editorRegistered', editor)
    // editor.getModel().setValue(editor.getModel().getValue()) // make it dirty so it refresh itself in the "project"
  }
}
export function resetMonacoModelsAndEditors(){
  getMonaco().editor.getModels().forEach(model=>model.dispose())
  editors.forEach(editor=>editor.dispose())
}
export function createAllMonacoModelsFor(example: AbstractProject){
  example.files.forEach(file=>{
    getMonacoModelFor( file)
  })
}

