import { FileTree } from '../../common/ui/FileTree';
import { dispatchSelectFileFromTree } from '../actions/selectFileFromTree';
// import { getState } from '../main';
import { TreeNode } from '../../common/ui-util/fileTreeUtil';
import { State } from '../actions/State';


export class CandombedFileTree extends FileTree<State>  {
   setSelectedFile(node: TreeNode){
     dispatchSelectFileFromTree(node)
  }

  getTestData(): TreeNode[]{
    return this.props.state.ui.fileTreeNodes
  }
}
