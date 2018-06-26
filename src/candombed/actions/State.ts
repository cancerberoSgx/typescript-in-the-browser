import { Project, ProjectFile } from '../types'

export interface State{
  project: Project
  selectedFile?: ProjectFile
}

import * as tsSampleProjectFiles from '../../examples/projectsJson/ts-sample-project.json'
const sampleFiles = (tsSampleProjectFiles as any).files as ProjectFile[]
export const initialState = {
  project: {
    name: 'yamat',
    files: sampleFiles
  },
}


// export let state: State

// export function getState(): State{
//   if(!state){
//     state = initialState
//   }
//   return state
// }

