import { getMonacoModelFor } from '../common/monaco/register';
import { getTsWorker } from '../common/monaco/tsWorker';
import { dispatchAddFile } from './actions/addFile';
import { getSelectedFile, State } from './actions/State';
import { filesToTreeNodes, TreeNode } from '../common/ui-util/fileTreeUtil';
import { ProjectFile } from './types';

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

export function projectFilesToTreeNodes(state: State): TreeNode[] {
  return filesToTreeNodes(state.project.files, undefined, (node, file: ProjectFile) => {
    if (node.isDirectory) {
      const found = state.ui.directoryExpandedNodeData.find(n=>n.fileName===node.fileName)
      node= Object.assign(node, { expanded: !found || found.expanded})
    }else {
      node= Object.assign({}, node)
    }
    return node
  })
}