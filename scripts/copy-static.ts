
const copies = [
  { source: 'src/static/*', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/css/bootstrap.min.css', dest: 'static' },
  { source: 'node_modules/jquery/dist/jquery.slim.min.js', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/js/bootstrap.min.js', dest: 'static' }, 
  {source: 'node_modules/monaco-editor/min/vs/base/*', dest: 'static/monaco-editor/min/vs/base'},
  {source: 'node_modules/monaco-editor/min/vs/editor/*', dest: 'static/monaco-editor/min/vs/editor'},
  {source: 'node_modules/monaco-editor/min/vs/language/typescript/*', dest: 'static/monaco-editor/min/vs/language/typescript'},
  {source: 'node_modules/monaco-editor/min/vs/loader.js', dest: 'static/monaco-editor/min/vs'}
]


import {cp, mkdir} from 'shelljs'
export function copy (){
  copies.forEach(c=>cp('-rf', c.source, c.dest))
}
mkdir('-p', 'static/monaco-editor/min/vs/base')
mkdir('-p', 'static/monaco-editor/min/vs/editor')
mkdir('-p', 'static/monaco-editor/min/vs/language/typescript')
copy()

