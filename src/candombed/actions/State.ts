import { TreeNode } from '../../common/ui-util/fileTreeUtil';
import { Project, ProjectFile } from '../types';
export interface State {
  project: Project
  selectedFile?: string

  ui: {
    fileTreeNodes: TreeNode[]
  }
}

export const initialState: State = {
  project: {
    name: '',
    files: []
  },
  ui: {
    fileTreeNodes: []
  }
}
export function getSelectedFile(state: State): ProjectFile {
  return state.project.files.find(f => f.fileName === state.selectedFile)
}