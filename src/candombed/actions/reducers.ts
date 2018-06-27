import { Action } from 'redux';
import { selectExample } from './selectExample';
import { selectFileFromTree } from './selectFileFromTree';
import { initialState, State } from './State';
import { addFiles } from './addFile';

function voidReducer(state: State = initialState, action: Action) {
  return state
}

// type T = 'SelectFileFromTreeAction' |'SelectExampleAction'

const allReducers: ((state: State, action: any)=>State)[] = [voidReducer, selectFileFromTree, selectExample, addFiles]
// selectExample({}, {type: '', exampleName: ''})
export function reducer (state: State = initialState, action: Action){
  let s: State = state
  allReducers.forEach( reducer=> {
    s = reducer(s, action ) 
  }
  )
  return s
}
export function getReduceres(){
  return reducer
}