import React from 'react';
// import { monaco } from '../uiUtil';
import { editor } from 'monaco-editor'
import { Editor } from '../../../common/ui/editor/Editor';
import { getUIConfig } from '../iuSettingsState';
// import { getUIConfig } from '../../../compiler/ui/iuSettingsState';
// import { AbstractFile } from '../../types';
// import {  getMonaco } from '../../util/monacoFacade';
// import { getMonacoModelFor, registerEditor } from '../../util/monacoUtil';

// type Props = { id: string, file: AbstractFile, width: string, height: string }

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
  protected installMonaco(){
    if (getUIConfig().editorKind === 'monaco') {
      return super.installMonaco()
    }
  }
}


