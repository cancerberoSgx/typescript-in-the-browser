
// log

const lines:string[] = []
export function log(...args:any[]){
  const line = args.join(' ') + '\n'
  lines.push(line)
}
export function resetLog(){
  lines.length = 0
}
export function getLogLines():string[]{
  return lines
}





import * as monaco from 'monaco-editor'
import { ProgramFile } from '../programProvider';
import { getMonaco } from './editor/monaco';
import * as ts from 'typescript'
import { Example } from '../types';

// monaco editor models to files conversion helpers
function getMonacoUriFromFile(file: ProgramFile){
  return getMonaco().Uri.file('/home/sg/project1/'+file.fileName)
}
export function getMonacoModelFor(file: ProgramFile): monaco.editor.IModel {
  const uri = getMonacoUriFromFile(file)
  let model = getMonaco().editor.getModels().find(m=>m.uri.toString()===uri.toString())
  if(model){
    return model
  }
  return getMonaco().editor.createModel(file.content, undefined, uri)
}

export function setMonacoTypeScriptDefaults(currentExampleProgram: ts.Program){
  getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: 'src', 
    module: getMonaco().languages.typescript.ModuleKind.CommonJS, 
    moduleResolution: getMonaco().languages.typescript.ModuleResolutionKind.NodeJs
  })
} 
const editors: monaco.editor.ICodeEditor[] = []
export function registerEditor(editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel){
  if(!editors.find(ed=>ed===editor)){
    editors.push(editor)
  }
  editor.getModel().setValue(  editor.getModel().getValue()) // make it dirty so it refresh itself in the "project"
}
export function resetMonacoModelsAndEditors(){
  getMonaco().editor.getModels().forEach(model=>model.dispose())
  editors.forEach(editor=>editor.dispose())
}
export function createAllMonacoModelsFor(example: Example){
  example.files.forEach(file=>{
    getMonacoModelFor( file)
  })
}

// export function refreshMonacoModelsAndEditors(){  
//   // editors.forEach(editor=>editor.render())//..updateOptions({}))
//   // getMonaco().editor.getModels().forEach(model=>(model as any).emitModelTokensChangedEvent())
//   getMonaco().editor.getModels().forEach(model=>model.setValue(model.getValue()))

//   // models.forEach(model=>model.updateOptions({}))
// }

// configure monaco.languages.typescripttypescriptDefaults for a new example
// export function configureMonacoTypeScriptDefaults(example: Example = getCurrentExample(), program: ts.Program = getCurrentExampleProgram()){
  // monaco().languages.typescript.typescriptDefaults.setDiagnosticsOptions({noSemanticValidation: false, noSyntaxValidation: false})
  // monaco().languages.typescript.typescriptDefaults.setCompilerOptions(program.getCompilerOptions() as any)

  // getCurrentExampleTsFilesOnly().forEach(f=>{
    // monaco().languages.typescript.typescriptDefaults.addExtraLib(f.content, f.fileName)
  // })
// }