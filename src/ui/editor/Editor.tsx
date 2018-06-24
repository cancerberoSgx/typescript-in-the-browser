import React from 'react';
import {monaco} from './monacoEditor';

export class Editor extends React.Component<{id: string, code:string, width: string, height: string}> {
  render() {
    return (
      <div id={this.props.id} style={{width: this.props.width, height: this.props.height}}></div>
    );
  }
  componentDidMount(){
    monaco().editor.create(document.getElementById(this.props.id), {
      value: this.props.code, 
      language: 'typescript'
    })
  }
}
