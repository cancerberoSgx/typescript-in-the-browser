import { Action } from 'redux';
import { initialState, State } from '../actions/State';
import { store } from '../main';
import { ProjectFile } from '../types';
import { projectFilesToTreeNodes } from '../projectActions';

export function addFiles(state: State = initialState, action: AddFilesAction): State {
  if (action.type === AddFilesActionId && state.project && state.project.files) {
    const files = state.project.files.concat(action.files).filter((v,i,arr)=>arr.indexOf(v)===i)
    state =  Object.assign({}, state, {
      project: Object.assign({}, state.project,  {
        files
      })
    });
    state = Object.assign({}, state, {ui: Object.assign({}, state.ui, {
      ui: Object.assign({}, state.ui, {
        fileTreeNodes: projectFilesToTreeNodes(state)
      })
    })
  })
  }
  return state
}

export const AddFilesActionId:'AddFilesAction' = 'AddFilesAction'
export function dispatchAddFile(files: ProjectFile[]) {
  store.dispatch({
    type: AddFilesActionId,
    files
  })
}
interface AddFilesAction extends Action {
  files: ProjectFile[]
}