import monaco from 'monaco-editor';
import { getMonaco, install, monacoEditorEmitter } from '..';
import { AbstractProject } from '../types';
import { tsLoaded } from '../util';
import { ActionManager, getActionManager } from './actionManager';
import { installTypes } from './installTypes';
import { monacoLoaded } from './monacoFacade';
import { createAllMonacoModelsFor, getMonacoModelFor, resetMonacoModelsAndEditors, uriToFileName } from './register';
import { installTsConfig, ProjectNature } from './tsConfig';

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
    return monacoLoaded()
      .then(() => {
        // now we load a .ts monaco model so we trigger ts languageService loading so we dont wait 
        // forever for the following promise:
        getMonacoModelFor({ fileName: '_blank.ts', content: '' })
        return tsLoaded()
      })
      .then(() => {
        getMonaco().languages.typescript.typescriptDefaults.setEagerModelSync(true)
        monacoEditorEmitter.on('editorRegistered', (editor) => {
          install(editor, (editor, model, def) => {
            this.willNavigateToOtherFile(editor, model, def)
          })
        })
        this.actionManager = getActionManager(this)
      })
  }
  /**
   * This method will be called when the user navigates a different file using ctrl+click on
   * references. The default implementation open the next sourcefile in the same editor. User can
   * override it to support other experience such as open a new editor in a new tab.  
   */
  protected willNavigateToOtherFile(oldEditor: monaco.editor.ICodeEditor, model: monaco.editor.IModel, def: monaco.languages.Location): void {
    // heads up - we can't perform the selection and revealPosition in oldEditor since 
    monacoEditorEmitter.once('editorRegistered', editor => {
      editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
      editor.setSelection(def.range)
    })
    this.selectedFileChanged(uriToFileName(model.uri))
  }


  /*
   * User must notify the workspace that another project is loaded.
   */
  projectChanged(project: AbstractProject): Promise<ProjectNature> {
    resetMonacoModelsAndEditors()
    return installTsConfig(project)
      .then(projectNature => {
        this.projectNature = projectNature
        createAllMonacoModelsFor(project)
        return installTypes(project, this.projectNature)
      })
  }
  /** 
   * The framework could notify when the current selected file changes - this could sometimes be
   * managed by the framework, for example in the default implementation of willNavigateToOtherFile
   */
  public abstract selectedFileChanged(fileName: string): void
}
