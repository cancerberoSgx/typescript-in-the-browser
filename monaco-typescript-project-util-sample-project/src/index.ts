import { renderEditor, AbstractProject, cdnAmdLoader } from '../../monaco-typescript-project-util/dist/src';
import { getDummyProject } from './dummyProject';




const context = {
  // we demonstrate with a dummy TS project in memory:
  project: getDummyProject() ,
  // we will be loading monaco-editor from an external CDN using its AMD bundled distro:
  cdnMonacoBaseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/'
}
document.querySelector('#main').innerHTML = compile(indexHbs)(context)


const editorComponent = renderEditor({
  container: document.getElementById('my-editor1'),
  // we simulate user has just open a file with the editor:
  file: context.project.files.find(f=>f.fileName.endsWith('.ts'))
})
// editor should be up and running - we register a key listener just to test:
editorComponent.monacoEditor.onKeyUp(e=>{
  console.log('hey!', e)
})


import * as indexHbs from './static/index.hbs'
import {compile} from 'handlebars'






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

