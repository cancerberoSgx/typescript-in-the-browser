import React from 'react';
import SplitPane from 'react-split-pane';
// import { getState } from '../state/State';
import { CandomedFileTree } from './FileTree';
import navbar from './navbar';
import { Editor } from '../../common/ui/editor/Editor';
import { State } from '../actions/State';

export default (state: State) => {

  return (
  <div className="container-fluid">
    {navbar()}

    <SplitPane
      split="vertical"
      minSize={100}
      defaultSize={'20%'}
      className="primary"
      pane1Style={{ background: '#eee' }}
      resizerStyle={{ background: '#000' }}
    >
      <CandomedFileTree project={state.project} />

      <SplitPane split="horizontal"
        minSize={100}
        defaultSize={'80%'}
        paneStyle={{   }}
        pane2Style={{ background: '#aaa4ba' }}>

        <Editor file={state.selectedFile} width="100%" height="100%" id={'selected-file-'} />
        <div><pre>console.log stuff panel</pre></div>
      </SplitPane>
    </SplitPane>
  </div>)
}
