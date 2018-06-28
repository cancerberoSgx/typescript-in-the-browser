import { getMonacoModelFor } from 'monaco-typescript-project-util'
import { getTsWorker } from'monaco-typescript-project-util'
import { dispatchAddFile } from './actions/addFile';
import { getSelectedFile, State } from './actions/State';
import { filesToTreeNodes, TreeNode } from 'monaco-typescript-project-util'
import { ProjectFile } from './types';
//TODO: move to util/actionManager
export async function getEmitOutput(state: State) {
  getTsWorker(getMonacoModelFor(getSelectedFile(state)).uri).then(async w => {
    const files = await w.getScriptFileNames()
    files.forEach(async f => {
      const emit = await w.getEmitOutput(f)
      const files = emit.outputFiles
        .filter(f => !f.name.startsWith('inmemory:/'))
        .map(outputFile => ({
          fileName: outputFile.name
            .replace('file:///', ''), content: outputFile.text
        }))
      dispatchAddFile(files)
    })
  })
}
//TODO: move to util/actionManager
export function projectFilesToTreeNodes(files: ProjectFile[], 
  directoryExpandedNodeData: { fileName: string, expanded: boolean }[]): TreeNode[] {
  return filesToTreeNodes(files, undefined, (node, file: ProjectFile) => {
    if (node.isDirectory) {
      const found = directoryExpandedNodeData.find(n => n.fileName === node.fileName)
      node = Object.assign(node, { expanded: !found || found.expanded })
    }
    return node
  })
}