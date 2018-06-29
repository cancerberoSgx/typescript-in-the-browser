import { editor } from 'monaco-editor';
import React from 'react';
import ReactDOM from 'react-dom';
import { getMonaco } from '../monaco/monacoFacade';
import { registerEditor, getMonacoModelFor } from '../monaco/register';
import { AbstractFile } from '../types';

type Props = { id?: string, file: AbstractFile, width?: string, height?: string, monacoEditorOptions?: editor.IEditorConstructionOptions }

/**
 * A React component ready to use, just give it the file, dimension and configuration as properties and it will render. 
 */
export class Editor extends React.Component<Props> {
  /** the monaco-editor internal instance of this component */
  monacoEditor: editor.IStandaloneCodeEditor;
  containerId: string;
  render() {
    this.containerId = this.props.id || '_id_' + Date.now()
    return (
      <div className="editor" id={this.containerId} style={{ width: this.props.width || '400px', height: this.props.height || '400px' }}></div>
    );
  }
  componentDidUpdate() {
    this.installMonaco()
  }
  componentDidMount() {
    this.installMonaco()
  }
  defaultMonacoOptions: editor.IEditorConstructionOptions = {
    automaticLayout: true,
    lightbulb: { enabled: true }
  }
  protected installMonaco() {
    const model = getMonacoModelFor(this.props.file)
    const monacoOptions = Object.assign({}, this.defaultMonacoOptions || {}, this.props.monacoEditorOptions || {}, { model })
    this.monacoEditor = getMonaco().editor.create(document.getElementById(this.containerId), monacoOptions)
    registerEditor(this.monacoEditor)
  }
  protected uninstallMonaco() {
    if (this.monacoEditor) {
      this.monacoEditor.dispose()
    }
  }
  componentWillUnmount() {
    this.uninstallMonaco()
  }
  componentWillUpdate() {
    this.uninstallMonaco()
  }
  componentWillMount() {
    this.uninstallMonaco()
  }
}


export type EditorOptions = Props & { container: HTMLElement }
/**
 * Example: 
 * 
 * ```
 * const editor = renderEditor({container: document.getElementById('my-awesome-editor2')})
 * editor.monacoEditor.onKeyUp()..
 * ```
 * a function to render the editor with given it the fie, dimension, container and configuration as properties and it 
 * will render for those not confortable with react
 */
export function renderEditor(options: EditorOptions): Editor {
  const editor = new Editor(options)
  ReactDOM.render([editor.render()], options.container)
  return editor
}


