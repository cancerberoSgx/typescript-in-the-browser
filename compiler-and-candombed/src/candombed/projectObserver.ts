import { installTypes } from 'monaco-typescript-project-util';
import { getMonaco } from 'monaco-typescript-project-util'
import { install } from 'monaco-typescript-project-util'
import { createAllMonacoModelsFor, resetMonacoModelsAndEditors, emitter as registerEmitter, getMonacoModelFor, uriToFileName } from 'monaco-typescript-project-util'
import { installTsConfig } from 'monaco-typescript-project-util'
import { dispatchSelectExample } from './actions/selectExample';
import { State } from './actions/State';
import { dirname } from 'path';
import { emitter as mainEmitter} from './main';
import { dispatchSelectFileFromTree } from './actions/selectFileFromTree';
import { setupProject } from 'monaco-typescript-project-util'

/** perform magics some the editor as a project with many files works */
export function installProjectObserver() {

  getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
  registerEmitter.on('editorRegistered', (editor) => {
    install(editor, (editor, model, def) => {
      // dispatchSelectFileFromTree({fileName: uriToFileName(model.uri) ,isDirectory: false, title: uriToFileName(model.uri), children: []})
      // setTimeout(() => { //TODO: do it via reducer & store
        // const def = locations[0]
        editor.setModel(model)
        editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
        editor.setSelection(def.range)
      // }, 300);
    })
  })
  setTimeout(() => {
    dispatchSelectExample('yamat')
  }, 1000);

  mainEmitter.on('stateChange', (oldState: State, newState: State) => {
    if (oldState.project.name !== newState.project.name) {
      setupProject(newState.project)
    }
  })
  // registerEmitter.on('modelRegistered', (model, file) => {
  //   if (file.fileName.endsWith('index.ts')) {
  //     // console.log(dirname(file.fileName) + '.ts');
  //     getMonacoModelFor({ fileName: dirname(file.fileName) + '..ts', content: file.content })
  //   }
  // })


}
