import React, { Component } from 'react';
import  { ExtendedNodeData } from 'react-sortable-tree';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { filesToTreeNodes, TreeNode } from '../ui-util/fileTreeUtil';
import { AbstractProject } from '../../common/types';
import { DragDropContext } from 'react-dnd';

export class FileTree<T> extends Component<{ state: T&{project: AbstractProject} }> {
  
  render() {
    if(!this.props.state.project){
      return (<div>No project open</div>)
    }
    const treeData = this.getTestData()
    return (
      <div style={{ height: '100%' }}>
        <SortableTree
          treeData={ treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={true}
          generateNodeProps={rowInfo => ({ onClick: event => this.nodeClicked(event, rowInfo) })}
        />
      </div>
    );
  }
  getTestData(){
    return filesToTreeNodes(this.props.state.project.files)
  }
  nodeClicked(event: MouseEvent, rowInfo: ExtendedNodeData): any {
    this.setSelectedFile(rowInfo.node as TreeNode)
  }

  setSelectedFile(node: TreeNode){
  }
}
