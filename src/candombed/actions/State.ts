import { Project, ProjectFile } from '../types'
// import { store } from '../main';

export interface State{
  project: Project
  selectedFile?: string
}

export const initialState = {project: {name: '', files: []}}
// export function getCurrentState():State {
//   return store.getState()
// }

export function getSelectedFile(state: State): ProjectFile{
  return state.project.files.find(f=>f.fileName===state.selectedFile)
}