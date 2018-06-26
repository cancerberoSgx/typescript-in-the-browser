import { Project } from './types';
import { Store } from 'redux';
import { emitter } from './main';
import { State } from './actions/State';
import { resetMonacoModelsAndEditors, createAllMonacoModelsFor } from '../common/util/monacoUtil';
import { getMonaco } from '../common/util/monacoFacade';
import { buildCompilerOptions, getTs } from '../common/util/util';


export function installProjectObserver(){

  emitter.on('stateChange', (oldState: State, newState: State)=>{
    if(oldState.project.name!==newState.project.name){
      console.log('create all monaco models for '+newState.project.files.length)
      resetMonacoModelsAndEditors()

      const tsconfig = newState.project.files.find(f=>f.fileName==='tsconfig.json')
      if(tsconfig && getTs()){
        const options = buildCompilerOptions(tsconfig.content)
        options.lib = undefined// ['lib.es6.d.ts']
          debugger
        getMonaco().languages.typescript.typescriptDefaults.setCompilerOptions(options as any)
      }
      createAllMonacoModelsFor(newState.project)
    }
  })
}