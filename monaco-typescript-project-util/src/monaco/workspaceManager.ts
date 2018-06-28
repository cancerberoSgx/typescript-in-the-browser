import { AbstractProject } from '../types';
import { resetMonacoModelsAndEditors, createAllMonacoModelsFor } from './register';
import { installTsConfig, ProjectNature } from './tsConfig';
import { installTypes } from './installTypes';
import { emitter as registerEmitter, getMonaco, install, requireMonaco } from '..';



import monaco from 'monaco-editor'
import { getActionManager, ActionManager } from './actionManager';

export abstract class Workspace {

  projectNature: ProjectNature;
  public actionManager: ActionManager;
  /** The very first call, will make sure monaco editor is loaded and register some internal listeners / configuration
   * Will start notifying user events, particularly user navigating to other files so users can implement the experience. See onNavigateToOtherFile  */
  start(): void {
    requireMonaco(() => {
      getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
      registerEmitter.on('editorRegistered', (editor) => {
        install(editor, (editor, model, def) => {
          this.willNavigateToOtherFile(editor, model, def)
        })
      })
      this.actionManager = getActionManager(this)
      this.workspaceReady()
    })
  }
  /** called by the workspce manager to notify the user the workspace is ready to use.
   *  monaco and the rest of libraries loaded. 
  */
  protected abstract workspaceReady(): void
  /**User is ready to paint / query its resources / UI . 
   * The default implementation open the next sourcefile in the same editor. */
  protected willNavigateToOtherFile(editor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location) {
    editor.setModel(model)
    editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
    editor.setSelection(def.range)
  }
  /**User must notify the workspace that another project is loaded. 
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
