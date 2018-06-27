import React, { Component } from 'react';
import  { ExtendedNodeData } from 'react-sortable-tree';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { filesToTreeNodes } from '../ui-util/fileTreeUtil';
import { AbstractProject } from '../../common/types';
import { DragDropContext } from 'react-dnd';

export class FileTree extends Component<{ project: AbstractProject }> {
  
  render() {
    if(!this.props.project){
      return (<div>No project open</div>)
    }
    const treeData = this.getTestData()
    return (
      <div style={{ height: '100%' }}>
        <SortableTree
          treeData={ treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          canDrag={false}
          generateNodeProps={rowInfo => {
            let nodeProps = { onClick: event => this.nodeClicked(event, rowInfo) }
            return nodeProps;
          }}
        />
      </div>
    );
  }
  getTestData(){
    return filesToTreeNodes(this.props.project.files)
  }
  nodeClicked(event: MouseEvent, rowInfo: ExtendedNodeData): any {
    if (!rowInfo.node || rowInfo.node && rowInfo.node.children && rowInfo.node.children.length) {
      return
    }
    const selectedFile = this.props.project.files.find(f => rowInfo.node.fileName === f.fileName)
    this.setSelectedFile(selectedFile)
  }

  setSelectedFile(file){
  }
}
