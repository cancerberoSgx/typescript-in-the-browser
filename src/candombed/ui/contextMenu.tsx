
import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { ExtendedNodeData } from 'react-sortable-tree';
import { TreeNode } from '../../common/ui-util/fileTreeUtil';
import { AbstractProject, AbstractState } from '../../common/types';

const Tooltip = require('tooltip.js')

function contextMenuHtml(node: TreeNode, state: AbstractState) {
  return (
    <div className="contextMenu"><h6>{node.fileName}</h6>
      <ul>
        <li><button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="properties" data-fileName={node.fileName}>Properties</button></li>
        <li> <button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="remove" data-fileName={node.fileName}>Remove</button></li>
        <li> <button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="copy" data-fileName={node.fileName}>Copy</button></li>
        <li><button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="paste" data-fileName={node.fileName}>Past</button></li>
        <li><button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="rename" data-fileName={node.fileName}>Rename</button></li>
        <li><button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="newFile" data-fileName={node.fileName}>New File</button></li>
        <li><button className="btn btn-link" onClick={e => onMenuButtonClick(e, state)} data-action="newFolder" data-fileName={node.fileName}>New Folder</button></li>
      </ul>
    </div>
  )
}

function onMenuButtonClick(e: MouseEvent<HTMLElement>, state: AbstractState) {
  const fileName = e.currentTarget.getAttribute('data-fileName')
  const action = e.currentTarget.getAttribute('data-action')
  if(action==='remove'){

  }else {
    alert('Not implemented yet')
  }
  console.log('onMenuButtonClick', fileName, action)
}

function buildContextMenuHtml(node: TreeNode, state: AbstractState) {
    const div = document.createElement('div')
  ReactDOM.render([contextMenuHtml(node, state)], div)
  return div.childNodes.item(0)
}

let tooltip:any = undefined
export function onContextMenu(e: MouseEvent<Element>, rowInfo: ExtendedNodeData, state: AbstractState) {
  e.preventDefault()
  if (tooltip) {
    try {
      tooltip.hide()
      tooltip.dispose()
    } catch (error) {
      console.log('error hiding tooltip', error, error.stack)
    }
  }
  tooltip = new Tooltip(e.currentTarget, {
    title: buildContextMenuHtml(rowInfo.node as TreeNode, state),
    html: true,
    trigger: "manual",
    placement: 'right',
    container: document.body,
    delay: { show: 0, hide: 999999 },
    popperOptions: {
      removeOnDestroy: true
    }
  })
  tooltip.show()
  tooltip._tooltipNode && (tooltip._tooltipNode.style.width = (e.currentTarget.getBoundingClientRect().width * 0.8) + 'px')
}
