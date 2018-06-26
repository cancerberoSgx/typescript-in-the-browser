import { createAllMonacoModelsFor, resetMonacoModelsAndEditors } from '../common/util/monacoUtil';
import { State } from './actions/State';
import { emitter } from './main';
import { installTsConfig } from './util/installJsConfig';
import { getMonaco } from '../common/util/monacoFacade';


export function installProjectObserver(){

  getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)

  emitter.on('stateChange', (oldState: State, newState: State)=>{
  //   debugger
  //   if(!oldState || !oldState.project || ! oldState.project.name){
  //     getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
  //   }
  //   else 
    if(oldState.project.name!==newState.project.name){
      console.log('create all monaco models for '+newState.project.files.length)
      resetMonacoModelsAndEditors()
      installTsConfig(newState.project)
      createAllMonacoModelsFor(newState.project)
    }
  })
}
