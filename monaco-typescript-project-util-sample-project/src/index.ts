import { AbstractFile, AbstractProject, Workspace, loadMonacoAmdFromExternalCdn } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { getDummyProject } from './dummyProject';
import layout from './layout';

// first of all, we load monaco-editor scripts and css. In this example we use an external CDN using its AMD
// bundled. The following call will load all required monaco-editor .js and .css:
loadMonacoAmdFromExternalCdn('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')

// we will implement a Workspace class to handle the the editor events. 
class OurAwesomeProjectEditor extends Workspace {
  private container: HTMLElement
  private project: AbstractProject
  private selectedFile: AbstractFile

  // This method is called when everthing is loaded and we are able to render our application:
  start() {
    // we will use a dummy project as an example. In the real life users will load their own
    this.project = getDummyProject()

    // Pick a file to show in the editor initially
    this.selectedFile = this.project.files.find(f => f.fileName.endsWith('.ts'))

    // we need to call this framework method each time the user loads a new project (in our case this happens
    // only once, at the beggining). The framework will reload all the files, tsconfig, libraries, etc. 
    this.projectChanged(this.project)
    this.render()
  }

  // this method renders our application creating a container element if it doesn't exist
  render() {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.setAttribute('id', 'ourAwesomeEditorContainer')
      document.body.appendChild(this.container)
    }
    ReactDOM.render(layout(this.project, this.selectedFile), this.container)
  }

  // We override this method to react when the framework automatically handle the change of the current
  // document. This happens for example when the user navigates to another file with ctrl-click (handled by
  // the framework) or when the user select a file from the left menu (see `projectFiles.tsx`) (handled by us)
  public selectedFileChanged(fileName: string): void {
    this.selectedFile = this.project.files.find(file => file.fileName === fileName) || this.selectedFile
    this.render()
  }
}

export const ourAwesomeEditor = new OurAwesomeProjectEditor()
ourAwesomeEditor.setup().then(() => ourAwesomeEditor.start())


