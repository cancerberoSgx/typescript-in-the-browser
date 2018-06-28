import { Action } from 'redux';
import { initialState, State } from '../actions/State';
// import { store } from '../main';
import { getExamples } from '../util/examples';
import { projectFilesToTreeNodes } from '../projectActions';
import { storeDispatch } from '../main';

export function selectExample(state: State = initialState, action: SelectExampleAction): State {
  if (action.type === SelectExampleActionId) {
    const newState: State = Object.assign({}, state, {
      project: getExamples().find(ex => ex.name === action.exampleName),
      selectedFile: action.exampleName, 
      ui: Object.assign({}, state.ui, {
        fileTreeNodes: projectFilesToTreeNodes(state.project.files, state.ui.directoryExpandedNodeData)
      })
    })
    return newState
  }
  return state
}
export const SelectExampleActionId: 'SelectExample' = 'SelectExample'

export function dispatchSelectExample(exampleName: string) {
  storeDispatch({
    type: SelectExampleActionId,
    exampleName
  })
}
interface SelectExampleAction extends Action {
  exampleName: string
}