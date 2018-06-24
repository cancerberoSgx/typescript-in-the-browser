import React from 'react';
import { monaco } from './monacoEditor';
import { editor } from 'monaco-editor'
import { getUIConfig } from '../iuConfig';

type Props = { id: string, code: string, width: string, height: string }

export class Editor extends React.Component<Props> {
  editor: editor.IStandaloneCodeEditor;
  // editorKind: string;
  // constructor(props: Props) {
  //   super(props)
  // this.editorKind = getUIConfig().editorKind
  // }
  render() {
    if (getUIConfig().editorKind === 'monaco') {
      return (
        <div className="editor" id={this.props.id} style={{ width: this.props.width, height: this.props.height }}></div>
      );
    } else {
      return (
        <pre className="editor"   id={this.props.id} style={{ width: this.props.width, height: this.props.height }}>{this.props.code}</pre>
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
      this.editor = monaco().editor.create(document.getElementById(this.props.id), {
        value: this.props.code,
        language: 'typescript',
        automaticLayout: true
      })
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



// function installResizeWatcher(el: HTMLElement, fn: ()=>void, interval:number = 2000):  NodeJS.Timer{
//   let offset = {width: el.offsetWidth, height: el.offsetHeight}
//   return setInterval(()=>{
//     let newOffset = {width: el.offsetWidth, height: el.offsetHeight}
//     if(offset.height!=newOffset.height||offset.width!=newOffset.width){
//       offset = newOffset
//       fn()
//     }
//   }, interval)
// }