import { AbstractProject } from '../types';
import { resetMonacoModelsAndEditors, createAllMonacoModelsFor, getMonacoModelFor } from './register';
import { installTsConfig, ProjectNature } from './tsConfig';
import { installTypes } from './installTypes';
import { monacoEditorEmitter, getMonaco, install, requireMonaco } from '..';



import monaco from 'monaco-editor'
import { getActionManager, ActionManager } from './actionManager';
import { monacoLoaded } from './monacoFacade';
import { tsLoaded } from '../util';

export abstract class Workspace {

  projectNature: ProjectNature;
  public actionManager: ActionManager;
  /**
   * The very first call, will make sure monaco editor, typescript and other necessary resources
   * are loaded . Also do initial setup (register some internal listeners / initial configuration).
   * Will start notifying user events, particularly user navigating to other files so users can
   * implement the experience (See onNavigateToOtherFile). 
   * @returns a promise resolved when everything is ready for the user to start rendering their app
   * and working with monaco 
   */
  setup(): Promise<void> {
    return new Promise(resolve => {
      monacoLoaded().then(() => {
        // now we load a .ts monaco model so we trigger ts languageService loading so we dont wait 
        // forever for the following promise:
        getMonacoModelFor({fileName: '_blank.ts', content: ''}) 
        return tsLoaded()
      })
      .then(()=>{
        getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
        monacoEditorEmitter.on('editorRegistered', (editor) => {
          install(editor, (editor, model, def) => {
            this.willNavigateToOtherFile(editor, model, def)
          })
        })
        this.actionManager = getActionManager(this)
        resolve()
      })
    })

  }
  /**
   * This method will be called when the user navigates a different file using ctrl+click on
   * references. The default implementation open the next sourcefile in the same editor. User can
   * override it to support other experience such as open a new editor in a new tab.  
   */
  protected abstract willNavigateToOtherFile(oldEditor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location):void; 
  //  {
  //   oldEditor.setModel(model)
  //   oldEditor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
  //   oldEditor.setSelection(def.range)

  //   //TODO: use this default impl and see if it works in candombed: 
  //   // monacoEditorEmitter.once('editorRegistered', editor => {
  //   //   editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
  //   //   editor.setSelection(def.range)
  //   // })
  //   // this.fileChanged(uriToFileName(model.uri))
  // }
  /*
   * User must notify the workspace that another project is loaded. 
   * TODO: we should wait until getTs() is true
   */
  projectChanged(project: AbstractProject): Promise<ProjectNature> {
    return new Promise((resolve, reject) => {
      resetMonacoModelsAndEditors()
      installTsConfig(project).then(projectNature => {
        this.projectNature = projectNature
        createAllMonacoModelsFor(project)
        installTypes(project, this.projectNature)
          .then(() => resolve(this.projectNature))
          .catch(reject)
      })
    })
  }

}
