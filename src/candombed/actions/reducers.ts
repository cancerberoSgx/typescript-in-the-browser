import { combineReducers, Action } from 'redux'
import {selectFileFromTree} from './selectFileFromTree'
import { State, initialState } from './State';

function voidReducer(state: State = initialState, action: Action) {
  return state
}

const allReducers = [voidReducer, selectFileFromTree]

export function reducer (state: State = initialState, action: Action){
  allReducers.forEach(r=>r(state, action as any))
  return state
}
export function getReduceres(){
  return reducer
}