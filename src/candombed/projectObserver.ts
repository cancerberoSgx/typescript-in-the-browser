import { createAllMonacoModelsFor, resetMonacoModelsAndEditors } from '../common/monaco/register';
import { State } from './actions/State';
import { emitter } from './main';
import { getMonaco } from '../common/monaco/monacoFacade';
import { installTsConfig } from '../common/monaco/tsConfig';


export function installProjectObserver(){

  getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)

  emitter.on('stateChange', (oldState: State, newState: State)=>{
    if(oldState.project.name!==newState.project.name){
      console.log('create all monaco models for '+newState.project.files.length)
      resetMonacoModelsAndEditors()
      installTsConfig(newState.project)
      createAllMonacoModelsFor(newState.project)
    }
  })
}
