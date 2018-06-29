
import monaco from 'monaco-editor';
import { Workspace } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { Action, createStore, Store } from 'redux';
import { getReduceres } from './actions/reducers';
import { dispatchSelectExample } from './actions/selectExample';
import { initialState, State } from './actions/State';
import layout from './ui/layout';

const store: Store = createStore(getReduceres())
export function storeDispatch<T extends Action>(a: T): T {
  return store.dispatch(a);
}

function render(state: State = store.getState()) {
  ReactDOM.render(layout(state), document.getElementById('candombed-main'))
}

let oldState: State = initialState


class CandombeWorkspace extends Workspace {

  // protected willNavigateToOtherFile(editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location) {
  //   console.log('User navigate to other document with ctrl+click');
  //   return super.willNavigateToOtherFile(editor, model, def) // we are fine with the default implementation
  // }

  start() {
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


  /**
   * This method will be called when the user navigates a different file using ctrl+click on
   * references. The default implementation open the next sourcefile in the same editor. User can
   * override it to support other experience such as open a new editor in a new tab.  
   */
  protected willNavigateToOtherFile(oldEditor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location):void
   {
    oldEditor.setModel(model)
    oldEditor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
    oldEditor.setSelection(def.range)

  //   //TODO: use this default impl and see if it works in candombed: 
  //   // monacoEditorEmitter.once('editorRegistered', editor => {
  //   //   editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
  //   //   editor.setSelection(def.range)
  //   // })
  //   // this.fileChanged(uriToFileName(model.uri))
  }
}

const workspace = new CandombeWorkspace()
workspace.setup().then(() => workspace.start())
