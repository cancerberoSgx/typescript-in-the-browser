import React from 'react';
import { editor } from 'monaco-editor'
import { Editor } from 'monaco-typescript-project-util';
import { getUIConfig } from '../iuSettingsState';

export class CompilerEditor extends Editor {
  editor: editor.IStandaloneCodeEditor;
  render() {
    if (getUIConfig().editorKind === 'monaco') {
      return super.render()
    } else {
      return (
        <pre className="editor" id={this.props.id} style={{ width: this.props.width, height: this.props.height }}>{this.props.file.content}</pre>
      )
    }
  }
  installMonaco(){
    if (getUIConfig().editorKind === 'monaco') {
      return super.installMonaco()
    }
  }
}


