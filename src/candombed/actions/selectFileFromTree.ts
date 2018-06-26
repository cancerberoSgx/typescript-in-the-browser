import { Action } from 'redux';
import { initialState, State } from '../actions/State';
import { store } from '../main';

export function selectFileFromTree(state: State = initialState, action: SelectFileFromTreeAction): State {
  if (action.type === SelectFileFromTreeActionId && state.project && state.project.files) {
    return Object.assign({}, state, {
      selectedFile: action.selectedFileName//state.project.files.find(f => f.fileName === action.selectedFileName)
    })
  }
  return state
}

export const SelectFileFromTreeActionId:'SelectFileFromTreeAction' = 'SelectFileFromTreeAction'
export function dispatchSelectFileFromTree(selectedFileName: string) {
  store.dispatch({
    type: SelectFileFromTreeActionId,
    selectedFileName
  })
}
interface SelectFileFromTreeAction extends Action {
  selectedFileName: string
}