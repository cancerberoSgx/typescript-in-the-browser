import React, { Component } from 'react';
import SortableTree, { ExtendedNodeData } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { filesToTreeNodes } from '../ui-util/fileTreeUtil';
import { AbstractProject } from '../../common/types';

export class FileTree extends Component<{ project: AbstractProject }> {
  
  render() {
    if(!this.props.project){
      return (<div>No project open</div>)
    }
    const treeData = filesToTreeNodes(this.props.project.files)
    return (
      <div style={{ height: '100%' }}>
        <SortableTree
          treeData={ treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          generateNodeProps={rowInfo => {
            let nodeProps = { onClick: event => this.nodeClicked(event, rowInfo) }
            return nodeProps;
          }}
        />
      </div>
    );
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
