
import ReactDOM from 'react-dom';
import layout from './ui/layout';
import { requireMonaco } from '../common/util/monacoFacade';
import { EventEmitter } from 'events';
import { createConstructorTypeNode } from 'typescript';
import { createStore, Store } from 'redux';
import { getReduceres } from './actions/reducers';
import { dispatchSelectFileFromTree } from './actions/selectFileFromTree';
// import { installResizableGrid } from './util/resizableGrid';

export const store: Store = createStore(getReduceres())

export function render() {
  // setInitialState()
  // getRenderEmitter().emit('beforeRender')
  console.log('render!', store.getState());
  
  ReactDOM.render(layout(store.getState()), document.getElementById('candombed-main')/* , () => getRenderEmitter().emit('afterRender') */)
}

requireMonaco(function(){
  store.subscribe(render)
  dispatchSelectFileFromTree('')
  render()
})


// function initialInstall() {
//   // window.onhashchange = render
//   render()
// }
// const renderEmitter = new EventEmitter()

// export function getRenderEmitter(): EventEmitter {
//   return renderEmitter
// }

// function setInitialState() {

// }

// getRenderEmitter().on('afterRender', installResizableGrid)
//TODO: on beforeRender uninstall
