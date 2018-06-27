import * as monaco from 'monaco-editor'
import { AbstractFile, AbstractProject } from '../types';
import { getMonaco } from './monacoFacade';
import { EventEmitter } from 'events';
// import { basename, dirname } from 'path';
// import { emitter as mainEmitter} from '../../candombed/main';

// monaco editor models to files conversion helpers
export function getMonacoUriFromFile(file: AbstractFile|string){
  return getMonaco().Uri.file(typeof file==='string' ? file : file.fileName)//'/home/sg/project1/'+file.fileName)
}
export function uriToFileName(uri: monaco.Uri){
  return uri.fsPath
}

export function getMonacoModelFor(file: AbstractFile): monaco.editor.IModel {
  if(!file){
    return getMonaco().editor.createModel('')
  }
  const uri = getMonacoUriFromFile(file)
  let model = getMonaco().editor.getModels().find(m=>m.uri.toString()===uri.toString())
  if(model){
    return model
  }
  model= getMonaco().editor.createModel(file.content, undefined, uri)
  emitter.emit('modelRegistered', model, file)
  return model
}

export function setMonacoTypeScriptDefaults(){
  getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: 'src', 
    module: getMonaco().languages.typescript.ModuleKind.CommonJS, 
    moduleResolution: getMonaco().languages.typescript.ModuleResolutionKind.NodeJs
  })
} 
const editors: monaco.editor.ICodeEditor[] = []

export const emitter = new EventEmitter()
export function registerEditor(editor: monaco.editor.ICodeEditor){
  if(!editors.find(ed=>ed===editor)){
    editors.push(editor)
    emitter.emit('editorRegistered', editor)
    // editor.getModel().setValue(editor.getModel().getValue()) // make it dirty so it refresh itself in the "project"
  }
}
export function resetMonacoModelsAndEditors(){
  getMonaco().editor.getModels().forEach(model=>model.dispose())
  editors.forEach(editor=>editor.dispose())
}
export function createAllMonacoModelsFor(example: AbstractProject){
  example.files.forEach(file=>{
    getMonacoModelFor(file)
  })
}
