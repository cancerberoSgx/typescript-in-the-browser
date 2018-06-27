import React, { Component, MouseEvent } from 'react';
import { ExtendedNodeData } from 'react-sortable-tree';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { filesToTreeNodes, TreeNode } from '../ui-util/fileTreeUtil';
import { AbstractProject } from '../../common/types';

// import {
//   Tooltip,
// } from 'react-tippy';
export class FileTree<T> extends Component<{ state: T & { project: AbstractProject, selectedFile?: string } }> {

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
            onClick: event => this.nodeClicked(event, rowInfo),
            class: this.props.state.selectedFile === (rowInfo.node as TreeNode).fileName ? 'selected' : '',
            onContextMenu: (e) => { this.onContextMenu(e, rowInfo) }
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

  setSelectedFile(node: TreeNode) {
  }


  tt = undefined
  onContextMenu(e: MouseEvent<HTMLElement>, rowInfo: ExtendedNodeData) {
    e.preventDefault();

    // debugger
    const Tooltip = require('tooltip.js');
    // if(!this.tt){
    if (this.tt) {
      this.tt.dispose()
    }
    this.tt = new Tooltip(e.currentTarget, {
      title: `<div class="contextMenu"><h5>${rowInfo.node.fileName}</h5>
    <button class="btn btn-link" onclick="" data-fileName="${rowInfo.node.fileName}">Properties</button>
    <button class="btn btn-link" onclick="" data-fileName="${rowInfo.node.fileName}">Remove</button>
    <button class="btn btn-link" onclick="" data-fileName="${rowInfo.node.fileName}">Duplicate</button>
    <button class="btn btn-link" onclick="" data-fileName="${rowInfo.node.fileName}">Copy</button>
    <button class="btn btn-link" onclick="" data-fileName="${rowInfo.node.fileName}">Past</button>
    </div>`,
      html: true,
      trigger: "manual",
      placement: 'right',
      container: document.body,
      delay: { show: 0, hide: 999999 },
      popperOptions: {
        removeOnDestroy: true
      }
    }
    );
    this.tt.show();
  }
}
