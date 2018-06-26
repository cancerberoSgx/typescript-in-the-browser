import { Project, ProjectFile } from './types';
import { getJSDocTemplateTag } from 'typescript';

export interface State{
  project: Project
  selectedFile?: ProjectFile
}

export let state: State

export function getState(): State{
  if(!state){
    buildInitialState()
  }
  return state
}


import * as tsSampleProjectFiles from '../examples/projectsJson/ts-sample-project.json'
const sampleFiles = (tsSampleProjectFiles as any).files as ProjectFile[]
console.log(tsSampleProjectFiles);

function buildInitialState() {
  state = {
    project: {
      name: 'yamat',
      files: sampleFiles
    },
  }
}