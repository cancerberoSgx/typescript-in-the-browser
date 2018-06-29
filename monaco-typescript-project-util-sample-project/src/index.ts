import { cdnAmdLoader, emitter, Editor, MonacoRegisterEmitter, Workspace, AbstractProject, AbstractFile, uriToFileName } from 'monaco-typescript-project-util';
import * as monaco from 'monaco-editor'
import { getDummyProject } from './dummyProject';
import ReactDOM from 'react-dom';
import layout from './layout';

// first of all, we load monaco-editor scripts and css. In this example we use an external CDN
// using its AMD bundled:  
cdnAmdLoader('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')

// we will implement a Workspace class to handle the the editor events. 
class OurProjectWorkspace extends Workspace {

  // This method will be called when the user navigates a different file using ctrl+click on references
  protected willNavigateToOtherFile(editor: monaco.editor.ICodeEditor,
    model: monaco.editor.IModel, def: monaco.languages.Location) {

    // we update the `this.selectedFile` so is shown as selected in the projectFiles list:
    const selectedFileName = uriToFileName(model.uri)
    this.selectedFile = this.project.files.find(file => file.fileName === selectedFileName) || this.selectedFile

    console.log(`User navigate to source file ${selectedFileName} ${this.selectedFile.fileName} with ctrl+click`);
    this.render()

    // the default implementation will just change the content of existing editor. 
    // We could do something different like open a new editor in a new tab, but in this 
    // example we just use the default implementation: 
    super.willNavigateToOtherFile(editor, model, def)
  }


  // `workspaceReady()` will be called when everthing is loaded and ready to render our application:
  startOurAwesomeEditor() {
    debugger
    // we will use a dummy project as an example. In the real life users will load their own
    this.project = getDummyProject()

    // Pick a file to show in the editor initially
    this.selectedFile = this.project.files.find(f => f.fileName.endsWith('.ts'))

    this.projectChanged(this.project)
    this.render()
  }


  // the following members is just our own implementation's logic

  project: AbstractProject

  selectedFile: AbstractFile

  render() {
    // render our layout
    ReactDOM.render(layout(this.project, this.selectedFile), document.getElementById('main'))
  }

  onSelectFile(fileName: string) {
    this.selectedFile = this.project.files.find(file => file.fileName === fileName) || this.selectedFile
    console.log(`User navigate to source file ${fileName} ${this.selectedFile.fileName} using file menu`);
    this.render()
  }
}



export const workspace = new OurProjectWorkspace()
workspace.start().then(()=>workspace.startOurAwesomeEditor())


