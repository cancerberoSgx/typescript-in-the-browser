import { dispatchExamples } from './examples';
import ReactDOM from 'react-dom'
import layout from './ui/layout';
import { requireMonaco } from './ui/monacoFacade';

export function render() {
  dispatchExamples()
  ReactDOM.render(layout(), document.getElementById('typescript-in-the-browser-main'))
}

// heads up - monaco-editor is loaded with AMD async from index.html so we need to make sure is already loaded
requireMonaco(() => { 
  render()
  window.onhashchange = render
})