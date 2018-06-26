import { Action } from 'redux';
import { initialState, State } from '../actions/State';
import { store } from '../main';
// import { getNavigationBarItems } from '../../common/monaco/tsWorker';
// import { getMonacoModelFor, getMonacoUriFromFile } from '../../common/monaco/util';

export function selectFileFromTree(state: State = initialState, action: SelectFileFromTreeAction): State {
  if (action.type === SelectFileFromTreeActionId && state.project && state.project.files) {

    // getNavigationBarItems(getMonacoUriFromFile(action.selectedFileName)).then(result=>console.log('sdfsdfsdf', result))

    return Object.assign({}, state, {
      selectedFile: action.selectedFileName
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