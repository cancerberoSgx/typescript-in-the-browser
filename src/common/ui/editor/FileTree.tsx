import React, { Component } from 'react';
import SortableTree, { ExtendedNodeData } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { filesToTreeNodes } from '../../../compiler/util/util';
import { Example } from '../../../compiler/types';
import { setSelectedFile } from '../../../compiler/ui/mainContentProjectEditor/projectState';
import { render } from '../../../compiler/main';

export class FileTree extends Component<{ example: Example }> {
  
  render() {
    const treeData = filesToTreeNodes(this.props.example.files)
    return (
      <div style={{ height: 400 }}>
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
    const selectedFile = this.props.example.files.find(f => rowInfo.node.fileName === f.fileName) || (this.props.example.exampleSource.fileName === rowInfo.node.fileName ? this.props.example.exampleSource : undefined)
    if(selectedFile){
      setSelectedFile(selectedFile)
      render()
    }
  }
}
