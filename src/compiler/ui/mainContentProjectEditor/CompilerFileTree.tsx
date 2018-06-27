import { setSelectedFile } from './../mainContentProjectEditor/projectState';
import { render } from '../../main';
import { AbstractProject, AbstractFile } from '../../../common/types';
import { FileTree } from '../../../common/ui/FileTree';
import { TreeNode } from '../../../common/ui-util/fileTreeUtil';

export class CompilerFileTree extends FileTree<{}>  {
   setSelectedFile(node: TreeNode){

    const f = this.props.state.project.files.find(f => node.fileName === f.fileName)
    setSelectedFile(f)
      render()
  }

}
