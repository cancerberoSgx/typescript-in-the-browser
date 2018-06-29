
import { Workspace } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { Action, createStore, Store } from 'redux';
import { getReduceres } from './actions/reducers';
import { dispatchSelectExample } from './actions/selectExample';
import { dispatchSelectFileFromTree } from './actions/selectFileFromTree';
import { State } from './actions/State';
import layout from './ui/layout';

const store: Store = createStore(getReduceres())
export function storeDispatch<T extends Action>(a: T): T {
  return store.dispatch(a);
}

function render(state: State = store.getState()) {
  ReactDOM.render(layout(state), document.getElementById('candombed-main'))
}

class CandombeWorkspace extends Workspace {
  oldState: State
  start() {
    store.subscribe(() => {
      const newState = store.getState()
      if (this.oldState && this.oldState.project.name != newState.project.name) {
        this.projectChanged(newState.project)
      }
      this.oldState = newState
      render(newState)
    })
    setTimeout(() => {
      dispatchSelectExample('yamat')
    }, 500);
  }

  public selectedFileChanged(fileName: string) {
    dispatchSelectFileFromTree({ fileName, children: [], isDirectory: false })
  }
}

const workspace = new CandombeWorkspace()
workspace.setup().then(() => workspace.start())
