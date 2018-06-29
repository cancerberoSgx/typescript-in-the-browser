import * as monaco from 'monaco-editor';
import { AbstractFile, AbstractProject, cdnAmdLoader, monacoEditorEmitter, uriToFileName, Workspace } from 'monaco-typescript-project-util';
import ReactDOM from 'react-dom';
import { getDummyProject } from './dummyProject';
import layout from './layout';

// first of all, we load monaco-editor scripts and css. In this example we use an external CDN using its AMD
// bundled. The following call will load all required monaco-editor .js and .css:
cdnAmdLoader('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.13.1/min/')

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

  // this method will be called when users click a file from the left menu (see `projectFiles.tsx`)
  selectFile(fileName: string) {
    this.selectedFile = this.project.files.find(file => file.fileName === fileName) || this.selectedFile
    this.render()
  }

  // This method will be called when the user navigates a different file using ctrl+click on references. In
  // this example we just change the `this.selectedFile` and re-render so visually it will be shown in the
  // same editor but others could do differently like opening a new editor in a new tab, etc
  protected willNavigateToOtherFile(oldEditor: monaco.editor.ICodeEditor, model: monaco.editor.IModel,
    def: monaco.languages.Location): void {

    monacoEditorEmitter.once('editorRegistered', editor => {
      // after user navigates to another file we want to select the code of the definition of what he clicked
      // and scroll to that position, this is why use `monacoEditorEmitter.once('editorRegistered' to be
      // notified when a new editor is created and use that one instead of using `oldEditor` since each time
      // user change file the monaco editor instance is created. TODO: maybe we leave this for a second (more
      // complex example)
      editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
      editor.setSelection(def.range)
    })
    this.selectFile(uriToFileName(model.uri))
  }
}

export const ourAwesomeEditor = new OurAwesomeProjectEditor()
ourAwesomeEditor.setup().then(() => ourAwesomeEditor.start())


