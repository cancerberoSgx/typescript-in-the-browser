
import ReactDOM from 'react-dom';
import layout from './ui/layout';
import { requireMonaco } from '../common/util/monacoFacade';
import { EventEmitter } from 'events';
// import { installResizableGrid } from './util/resizableGrid';

export function render() {
  setInitialState()
  getRenderEmitter().emit('beforeRender')
  ReactDOM.render(layout(), document.getElementById('candombed-main'), () => getRenderEmitter().emit('afterRender'))
}

const renderEmitter = new EventEmitter()

export function getRenderEmitter(): EventEmitter {
  return renderEmitter
}
requireMonaco(initialInstall)

function initialInstall() {
  window.onhashchange = render
  render()
}

function setInitialState() {

}

// getRenderEmitter().on('afterRender', installResizableGrid)
//TODO: on beforeRender uninstall
