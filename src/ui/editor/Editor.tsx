import React from 'react';
import monaco from './monacoEditor';

export class Editor extends React.Component<{id: string, code:string, width: string, height: string}> {
  render() {
    return (
      <div id={this.props.id} style={{width: this.props.width, height: this.props.height}}></div>
    );
  }
  componentDidMount(){
    // debugger
    // console.log('monaco.editor', monaco.editor);
    
    monaco.editor.create(document.getElementById(this.props.id), {
      value: this.props.code, 
      language: 'typescript'
    })
  }
}


// var editor = monaco.editor.create(document.getElementById('container'), {
//   value: [
//     'function x() {',
//     '\tconsole.log("Hello world!");',
//     '}'
//   ].join('\n'),
//   language: 'javascript'
// });
