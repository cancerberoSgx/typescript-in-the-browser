import { FileTree, TreeNode } from 'monaco-typescript-project-util';
import { MouseEvent } from 'react';
import { ExtendedNodeData } from 'react-sortable-tree';
import { dispatchSelectFileFromTree } from '../actions/selectFileFromTree';
import { State } from '../actions/State';
import { onContextMenu, destroyTooltip } from './contextMenu';
import { projectFilesToTreeNodes } from '../projectActions';


export class CandombedFileTree extends FileTree<State>  {
  setSelectedFile(node: TreeNode) {
    dispatchSelectFileFromTree(node)
    destroyTooltip() // TODO: do it right with state and redux!
  }

  getTestData(): TreeNode[] {
    return projectFilesToTreeNodes(this.props.state.project.files, this.props.state.ui.directoryExpandedNodeData)
  }

  onContextMenu(e: MouseEvent<Element>, rowInfo: ExtendedNodeData, state: State) {
    onContextMenu(e, rowInfo, state)
  }
}
