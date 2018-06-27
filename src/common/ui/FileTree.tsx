import React, { Component, MouseEvent } from 'react';
import SortableTree, { ExtendedNodeData } from 'react-sortable-tree';
import { AbstractState } from '../../common/types';
import { filesToTreeNodes, TreeNode } from '../ui-util/fileTreeUtil';
const FileExplorerTheme  = require('react-sortable-tree-theme-file-explorer');

export class FileTree<T extends AbstractState> extends Component<{ state:T }> {

  render() {
    if (!this.props.state.project) {
      return (<div>No project open</div>)
    }
    const treeData = this.getTestData()
    return (
      <div style={{ height: '100%' }} >
        <SortableTree
          treeData={treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={true}
          generateNodeProps={rowInfo => ({
            onClick: (event:MouseEvent) => this.nodeClicked(event, rowInfo),
            class: this.props.state.selectedFile === (rowInfo.node as TreeNode).fileName ? 'selected' : '',
            onContextMenu: (e:MouseEvent) => { this.onContextMenu(e, rowInfo, this.props.state) }
          })}
        />
      </div>
    );
  }
  getTestData() {
    return filesToTreeNodes(this.props.state.project.files)
  }
  nodeClicked(event: MouseEvent, rowInfo: ExtendedNodeData): any {
    console.log(event.button)
    this.setSelectedFile(rowInfo.node as TreeNode)
  }
  onContextMenu(e: MouseEvent<Element>, rowInfo: ExtendedNodeData, state: AbstractState){

  }
  setSelectedFile(node: TreeNode) {
  }
}
