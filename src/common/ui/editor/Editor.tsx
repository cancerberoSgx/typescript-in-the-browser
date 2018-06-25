import React from 'react';
// import { monaco } from '../uiUtil';
import { editor } from 'monaco-editor'
import { getUIConfig } from '../../../compiler/ui/iuSettingsState';
import { ProgramFile } from '../../../compiler/programProvider';
import {  getMonaco } from '../../util/monacoFacade';
import { getMonacoModelFor, registerEditor } from '../../util/monacoUtil';

type Props = { id: string, file: ProgramFile, width: string, height: string }

export class Editor extends React.Component<Props> {
  editor: editor.IStandaloneCodeEditor;
  render() {
    if (getUIConfig().editorKind === 'monaco') {
      return (
        <div className="editor" id={this.props.id} style={{ width: this.props.width, height: this.props.height }}></div>
      );
    } else {
      return (
        <pre className="editor" id={this.props.id} style={{ width: this.props.width, height: this.props.height }}>{this.props.file.content}</pre>
      )
    }
  }
  componentDidUpdate(){
    this.installMonaco()
  }
  componentDidMount() {
    this.installMonaco()
  }
  private installMonaco(){
    if (getUIConfig().editorKind === 'monaco') {
      const model = getMonacoModelFor(this.props.file)
      this.editor = getMonaco().editor.create(document.getElementById(this.props.id), {
        model ,
        automaticLayout: true
      })
      setTimeout(()=>registerEditor(this.editor, model), 1000)
    }
  }
  private uninstallMonaco(){
    if (this.editor) {
      this.editor.dispose()
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


