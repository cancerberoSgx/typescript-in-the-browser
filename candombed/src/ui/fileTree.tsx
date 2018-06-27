import { FileTree, TreeNode } from 'monaco-typescript-project-util';
import { dispatchSelectFileFromTree } from '../actions/selectFileFromTree';
// import { getState } from '../main';
// import { TreeNode } from '../../common/ui-util/fileTreeUtil';
import { State } from '../actions/State';
import { ExtendedNodeData } from 'react-sortable-tree';
import { MouseEvent } from 'react';
import { onContextMenu } from './contextMenu';


export class CandombedFileTree extends FileTree<State>  {
   setSelectedFile(node: TreeNode){
     dispatchSelectFileFromTree(node)
  }

  getTestData(): TreeNode[]{
    return this.props.state.ui.fileTreeNodes
  }
  
  onContextMenu(e: MouseEvent<Element>, rowInfo: ExtendedNodeData, state:  State){
onContextMenu
  }
}
