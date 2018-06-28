
import { emitter as registerEmitter, getMonaco, install, requireMonaco, Workspace } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { Action, createStore, Store } from 'redux';
import { getReduceres } from './actions/reducers';
import { dispatchSelectExample } from './actions/selectExample';
import { initialState, State } from './actions/State';
import layout from './ui/layout';
import monaco from 'monaco-editor'

const store: Store = createStore(getReduceres())
export function storeDispatch<T extends Action>(a: T): T {
  return store.dispatch(a);
}

function render(state: State = store.getState()) {
  ReactDOM.render(layout(state), document.getElementById('candombed-main'))
}

let oldState: State = initialState


class CandombeWorkspace extends Workspace {
  workspaceReady() {
    store.subscribe(() => {
      const newState = store.getState()
      if (oldState && oldState.project.name != newState.project.name) {
        this.projectChanged(newState.project)
      }
      oldState = newState
      render(newState)
    })
    setTimeout(() => {
      dispatchSelectExample('yamat')
    }, 500);
  }
  // protected willNavigateToOtherFile(editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location) {
  //   return super.willNavigateToOtherFile(editor ,model, def) // we are fine with the default implementation
  // }
}
const workspace = new CandombeWorkspace()
workspace.start()
