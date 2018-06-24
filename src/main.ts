import { dispatchExamples } from './examples';
import ReactDOM from 'react-dom'
import layout from './ui/layout';
import { requireMonaco } from './ui/editor/monacoEditor';


export function render() {
  dispatchExamples()
  ReactDOM.render(layout(), document.getElementById('typescript-in-the-browser-main'))
}

export function main() {
  render()
  window.onhashchange = render
}

requireMonaco(() => {
  main()
})