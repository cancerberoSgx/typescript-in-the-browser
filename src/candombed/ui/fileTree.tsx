import { AbstractFile } from '../../common/types';
import { FileTree } from '../../common/ui/FileTree';
import { dispatchSelectFileFromTree } from '../actions/selectFileFromTree';
import { getState } from '../main';
import { TreeNode } from '../../common/ui-util/fileTreeUtil';


export class CandombedFileTree extends FileTree  {
   setSelectedFile(selectedFile: AbstractFile){
     dispatchSelectFileFromTree(selectedFile.fileName)
  }

  getTestData(): TreeNode[]{
    return getState().ui.fileTreeNodes
  }
}
