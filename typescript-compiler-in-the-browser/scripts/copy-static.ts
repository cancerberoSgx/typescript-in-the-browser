
const copies = [
  { source: 'src/static/*', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/css/bootstrap.min.css', dest: 'static' },
  { source: 'node_modules/jquery/dist/jquery.slim.min.js', dest: 'static' },
  { source: 'node_modules/bootstrap/dist/js/bootstrap.min.js', dest: 'static' },
  { source: 'node_modules/monaco-editor/min/vs/base/*', dest: 'static/monaco-editor/min/vs/base' },
  { source: 'node_modules/monaco-editor/min/vs/editor/*', dest: 'static/monaco-editor/min/vs/editor' },
  { source: 'node_modules/monaco-editor/min/vs/language/typescript/*', dest: 'static/monaco-editor/min/vs/language/typescript' },
  { source: 'node_modules/monaco-editor/min/vs/basic-languages/markdown/*', dest: 'static/monaco-editor/min/vs/basic-languages/markdown' },
  { source: 'node_modules/monaco-editor/min/vs/language/json/*', dest: 'static/monaco-editor/min/vs/language/json' },
  { source: 'node_modules/monaco-editor/min/vs/loader.js', dest: 'static/monaco-editor/min/vs' },
  { source: 'node_modules/vscode-languageserver-types/lib/umd/main.js', dest: 'static/monaco-editor/min/vscode-languageserver-types/' },
  { source: 'node_modules/jsonc-parser/lib/umd/main.js', dest: 'static/jsonc-parser' }

]


import { cp, mkdir } from 'shelljs'
export function copy() {
  copies.forEach(c => {
    mkdir('-p', c.dest);
    cp('-rf', c.source, c.dest)
  })
}
copy()

