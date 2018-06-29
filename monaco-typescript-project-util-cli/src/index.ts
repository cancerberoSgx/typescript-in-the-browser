
export interface BuildConfig {
  folder: string
  /** the tool will have to install dependencies and for this is creates an external temporary project. This
   * could take a while and probably the user wants the build to be fast. This is after the first time the
   * tool will save the files in its local folder so the folowing times it's called will just copy files from
   * there. To force the tool to regenerat all the files, pass clearCache: true */
  clearCache: boolean
  monacoLoad: {
    externalCdn: boolean,
    baseUrl: string,
  }
}
export interface BuildResult {
  filesCopied: string[]
}

export function build(config: BuildConfig): BuildResult {
  const results: BuildResult =  {filesCopied: []}
  if(config.monacoLoad.externalCdn){

  }
  return results
}


const copiesLocalHost = [
  // { source: 'src/static/*', dest: 'static' },
  // { source: 'node_modules/bootstrap/dist/css/bootstrap.min.css', dest: 'static' },
  // { source: 'node_modules/jquery/dist/jquery.slim.min.js', dest: 'static' },
  // { source: 'node_modules/bootstrap/dist/js/bootstrap.min.js', dest: 'static' },
  { source: 'node_modules/monaco-editor/min/vs/base/*', dest: 'static/monaco-editor/min/vs/base' },
  { source: 'node_modules/monaco-editor/min/vs/editor/*', dest: 'static/monaco-editor/min/vs/editor' },
  { source: 'node_modules/monaco-editor/min/vs/language/typescript/*', dest: 'static/monaco-editor/min/vs/language/typescript' },
  { source: 'node_modules/monaco-editor/min/vs/basic-languages/markdown/*', dest: 'static/monaco-editor/min/vs/basic-languages/markdown' },
  { source: 'node_modules/monaco-editor/min/vs/language/json/*', dest: 'static/monaco-editor/min/vs/language/json' },
  { source: 'node_modules/monaco-editor/min/vs/loader.js', dest: 'static/monaco-editor/min/vs' },
  { source: 'node_modules/vscode-languageserver-types/lib/umd/main.js', dest: 'static/monaco-editor/min/vscode-languageserver-types/' },
  { source: 'node_modules/jsonc-parser/lib/umd/main.js', dest: 'static/jsonc-parser' }
]

export interface Copy{
  source: string
  dest: string
}
import { cp, mkdir } from 'shelljs'
import { tmpdir } from 'os';
export function copy(copies: Copy[]) {
  copies.forEach(c => {
    mkdir('-p', c.dest);
    cp('-rf', c.source, c.dest)
  })
}

// const tmpProjectName = 'tmp_project_'+Date.now
// function initTemporaryProject {
//   tmpdir
// }

