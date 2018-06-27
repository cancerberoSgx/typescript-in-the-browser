
import ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { requireMonaco, getMonaco } from 'monaco-typescript-project-util'
import { getReduceres } from './actions/reducers';
import layout from './ui/layout';
import { State, initialState } from './actions/State';
import { EventEmitter } from 'events';
import { installProjectObserver } from './projectObserver';

export const store: Store = createStore(getReduceres())

export function render(state: State = store.getState()) {
  ReactDOM.render(layout(state), document.getElementById('candombed-main'))
}

export const emitter = new EventEmitter()
let oldState: State = initialState
requireMonaco(function(){
  installProjectObserver()
  store.subscribe(()=>{
    const newState = store.getState()
    emitter.emit('stateChange', oldState, newState)
    oldState = newState
    render(newState)
  })
})

