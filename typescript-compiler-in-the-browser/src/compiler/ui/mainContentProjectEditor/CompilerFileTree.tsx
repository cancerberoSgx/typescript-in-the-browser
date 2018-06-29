import { setSelectedFile } from './../mainContentProjectEditor/projectState';
import { render } from '../../main';
import { AbstractProject, AbstractFile, AbstractState } from 'monaco-typescript-project-util';

import { FileTree } from 'monaco-typescript-project-util';

import { TreeNode } from 'monaco-typescript-project-util';


export class CompilerFileTree extends FileTree<{ project: AbstractProject }>  {
  setSelectedFile(node: TreeNode) {

    const f = this.props.state.project.files.find(f => node.fileName === f.fileName)
    setSelectedFile(f)
    render()
  }

}
