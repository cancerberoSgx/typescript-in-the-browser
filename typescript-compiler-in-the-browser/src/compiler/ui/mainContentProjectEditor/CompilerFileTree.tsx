import { FileTree, TreeNode } from 'monaco-typescript-project-util';
import { render } from '../../main';
import { Example } from '../../types';
import { setSelectedFile } from './projectState';

export class CompilerFileTree extends FileTree<{ project: Example }>  {
  private addExampleSource(){
    this.props.state.project.files = [this.props.state.project.exampleSource].concat(this.props.state.project.files||[])
  }
  componentWillUpdate() {
    this.addExampleSource()
  }  
  componentWillMount() {
    this.addExampleSource()
  }
  setSelectedFile(node: TreeNode) {
    setSelectedFile(this.props.state.project.files.find(f => node.fileName === f.fileName))
    render()
  }
}
