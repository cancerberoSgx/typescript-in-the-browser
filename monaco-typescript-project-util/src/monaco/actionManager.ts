import { AbstractProject } from '../types';
import { Workspace } from './workspaceManager';
import { installTypes } from './installTypes';
import { ProjectNature } from './tsConfig';
import { Action } from 'redux';

export class ActionManager {
  constructor(private workspace: Workspace) {

  }
  installTypes(project: AbstractProject): Promise<ProjectNature> {
    return installTypes(project, this.workspace.projectNature)
  }
}
let instance: ActionManager

export  function getActionManager(w?: Workspace): ActionManager {
  if (w && !instance) {
    instance = new ActionManager(w)
  }
  return instance
}