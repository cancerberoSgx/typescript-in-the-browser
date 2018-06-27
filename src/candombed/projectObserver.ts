import { createAllMonacoModelsFor, resetMonacoModelsAndEditors, editorRegisterEmitter } from '../common/monaco/register';
import { State } from './actions/State';
import { emitter } from './main';
import { getMonaco } from '../common/monaco/monacoFacade';
import { installTsConfig } from '../common/monaco/tsConfig';
import { install } from '../common/monaco/navigateExternalDefinitions';
import { installTypes } from '../common/monaco/installTypes';
import { dispatchSelectExample } from './actions/selectExample';

/** perform magics some the editor as a project with many files works */
export function installProjectObserver(){

  getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
  editorRegisterEmitter.on('editorRegistered', (editor)=>{
    install(editor, (editor, model, def)=>{
      editor.setModel(model)
      editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
      editor.setSelection(def.range)
    })
  })
  setTimeout(() => {
    dispatchSelectExample('yamat')
  }, 1000);
  emitter.on('stateChange', (oldState: State, newState: State)=>{
    if(oldState.project.name!==newState.project.name){
      console.log('create all monaco models for '+newState.project.files.length)
      resetMonacoModelsAndEditors()
      installTsConfig(newState.project)
      createAllMonacoModelsFor(newState.project)
      installTypes(newState.project)
    }
  })
}
