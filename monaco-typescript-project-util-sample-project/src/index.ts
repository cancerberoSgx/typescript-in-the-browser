import { renderEditor, AbstractProject, cdnAmdLoader } from '../../monaco-typescript-project-util/dist/src';
import { getDummyProject } from './dummyProject';


const  printFileList = (project: AbstractProject): string => (
  // monaco-typescript-project-util provides a tree view for files but this time we want to make one by ourselves. 
 `
<p>"${project.name}" files: </p>
<ul>
  ${project.files.map(file =>
  `<li><a href="#">${file.fileName}</a></li>`)
  .join('\n')}
</ul>
`)

//let's try to build a typescript project editor with monaco-typescript-project-util to see how easy it is
const project = getDummyProject()
document.querySelector('.files').innerHTML = printFileList(project)

const baseUrl = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/`
console.log(printFileList(project), cdnAmdLoader(baseUrl))

const automaticallySelected = project.files[0]
const editorComponent = renderEditor({
  container: document.getElementById('my-editor1'),
  file: automaticallySelected
})
editorComponent.monacoEditor.onKeyUp(()=>{
  alert('keyup -you can\'t use it :P')
})


// function printFileList(project: AbstractProject){


