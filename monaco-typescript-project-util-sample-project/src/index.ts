import { cdnAmdLoader, emitter, Editor, MonacoRegisterEmitter, Workspace } from 'monaco-typescript-project-util';
import * as monaco from 'monaco-editor'
import { getDummyProject } from './dummyProject';
import ReactDOM from 'react-dom';
import layout from './layout';

// we will be loading monaco-editor from an external CDN using its AMD bundled:
cdnAmdLoader('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')

// function renderMonacoLoader() {
//   const monacoLoaderHtmlFragment = cdnAmdLoader('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')
//   document.getElementById('monacoLoaderContainer').innerHTML = monacoLoaderHtmlFragment
//   // const monacoLoaderContainer = document.createElement('div')
//   // monacoLoaderContainer.innerHTML = monacoLoaderHtmlFragment
//   // document.body.appendChild(monacoLoaderContainer)
// }
// renderMonacoLoader()

function renderApp(){
  // we demonstrate with a dummy TsS project in memory:
  const project = getDummyProject()
  // we simulate user has just open a file with the editor:
  const file = project.files.find(f=>f.fileName.endsWith('.ts'))
  ReactDOM.render(layout(project, file), document.getElementById('main'))
}



class CandombeWorkspace extends Workspace {
  workspaceReady() {
    // debugger
    renderApp()
  }
  protected willNavigateToOtherFile(editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location) {
    console.log('User navigate to other document with ctrl+click');
    return super.willNavigateToOtherFile(editor ,model, def) // we are fine with the default implementation
    
  }
}
const workspace = new CandombeWorkspace()
workspace.start()





// let editor: monaco.editor.ICodeEditor
// emitter.on('editorRegistered', (ed)=>{
//   editor = ed
//   ed.onDidChangeModel(e=>{
//     console.log('mode changed')
//   })
// })




// const  printFileList = (project: AbstractProject): string => (
//   // monaco-typescript-project-util provides a tree view for files but this time we want to make one by ourselves. 
//  `
// <p>"${project.name}" files: </p>
// <ul>
//   ${project.files.map(file =>
//   `<li><a href="#">${file.fileName}</a></li>`)
//   .join('\n')}
// </ul>
// `)

//let's try to build a typescript project editor with monaco-typescript-project-util to see how easy it is

