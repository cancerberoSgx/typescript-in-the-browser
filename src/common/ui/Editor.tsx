import { editor } from 'monaco-editor';
import React from 'react';
import { AbstractFile } from '../types';
import { getMonaco } from '../monaco/monacoFacade';
import { getMonacoModelFor, registerEditor } from '../monaco/util';

type Props = { id: string, file: AbstractFile, width: string, height: string }

export class Editor extends React.Component<Props> {
  editor: editor.IStandaloneCodeEditor;
  render() {
    return (
      <div className="editor" id={this.props.id} style={{ width: this.props.width, height: this.props.height }}></div>
    );
  }
  componentDidUpdate() {
    this.installMonaco()
  }
  componentDidMount() {
    this.installMonaco()
  }
  protected installMonaco() {
    const model = getMonacoModelFor(this.props.file)
    this.editor = getMonaco().editor.create(document.getElementById(this.props.id), {
      model,
      automaticLayout: true, 
      lightbulb: {enabled: true}
    })
    // setTimeout(() => registerEditor(this.editor), 500)
    

  }

  private uninstallMonaco() {
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


