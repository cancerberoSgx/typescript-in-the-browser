import { Action } from 'redux';
import { initialState, State } from '../actions/State';
import { store } from '../main';

export function selectFileFromTree(state: State = initialState, action: SelectFileFromTreeAction ){
  if(action.type===SelectFileFromTreeActionId){
    state.selectedFile=state.project.files.find(f=>f.fileName===action.selectedFileName)
    // debugger
  }
  return state
}

const SelectFileFromTreeActionId = 'SelectFileFromTreeAction'
export function dispatchSelectFileFromTree(selectedFileName: string){
  store.dispatch({
    type: SelectFileFromTreeActionId, 
    selectedFileName
  })
}
interface SelectFileFromTreeAction extends Action {
  selectedFileName: string
}