// this is the main project editor and is where all starts based on monaco-typescript-project-util

import * as monaco from 'monaco-editor';
import { monacoEditorEmitter, uriToFileName, Workspace, getMonacoModelFor, AbstractFile, buildCompilerOptions } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { dispatchExamples, getCurrentExample } from './manager';
import layout from './ui/layout';
import { setSelectedFile } from './ui/mainContentProjectEditor/projectState';

export function render() {
  ReactDOM.render(layout(), document.getElementById('typescript-in-the-browser-main'), () => { })
}

class OurAwesomeProjectEditor extends Workspace {
  selectedFileChanged(fileName: string): void {
    throw new Error('Method not implemented.');
  }
  start() {
    window.onhashchange = () => { dispatchExamples().then(render) }
    dispatchExamples().then(render)
  }
  selectFile(fileName: string) {
    setSelectedFile(getCurrentExample().files.find(f => f.fileName === fileName))
    render()
  }

  protected willNavigateToOtherFile(oldEditor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location): void {
    monacoEditorEmitter.once('editorRegistered', editor => {
      editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
      editor.setSelection(def.range)
    })
    const fileName = uriToFileName(model.uri)
    const f = getCurrentExample().files.find(f => f.fileName === fileName)
    setSelectedFile(f)
    render()
  }
}

export const DEBUG = false

export const editor = new OurAwesomeProjectEditor()
editor.setup().then(() => editor.start())
