import { Action } from 'redux';
import { initialState, State } from '../actions/State';
import { store } from '../main';
import { getExamples } from '../util/examples';
import { projectFilesToTreeNodes } from '../projectActions';

export function selectExample(state: State = initialState, action: SelectExampleAction): State {
  if (action.type === SelectExampleActionId) {
    const exampleFound = getExamples().find(ex => ex.name === action.exampleName)
    // console.log('selectExample', exampleFound, exampleFound.name);
    state = Object.assign({}, state,
      {
        project: exampleFound,
        selectedFile: undefined
      })

    state = Object.assign({}, state, {
      ui: Object.assign({}, state.ui, {
        fileTreeNodes: projectFilesToTreeNodes(state)
      })
    })

  }
  return state
}
export const SelectExampleActionId: 'SelectExample' = 'SelectExample'

export function dispatchSelectExample(exampleName: string) {
  store.dispatch({
    type: SelectExampleActionId,
    exampleName
  })
}
interface SelectExampleAction extends Action {
  exampleName: string
}