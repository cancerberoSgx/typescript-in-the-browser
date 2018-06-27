import React from 'react';
import SplitPane from 'react-split-pane';
import { CandombedFileTree } from './fileTree';
import navbar from './navbar';
import { Editor } from '../../common/ui/Editor';
import { State, getSelectedFile } from '../actions/State';
import whatsThisModal from './modals/whatsThisModal';
import loadProjectModal from './modals/loadProjectModal';
import saveProjectModal from './modals/saveProjectModal';


export default (state: State) => {

  return (
  <div className="container-fluid">
    {navbar(state)}

    <SplitPane
      split="vertical"
      // minSize={'10%'}
      defaultSize={'20%'}
      // maxSize={'80%'}
      className="primary"
      pane1Style={{ background: '#eee' }}
      resizerStyle={{ background: '#000' }}
    >
      <CandombedFileTree state={state}/>

      <SplitPane split="horizontal"
        minSize={100}
        defaultSize={'80%'}
        paneStyle={{  }}
        pane2Style={{ background: '#aaa4ba' }}>

        <Editor file={getSelectedFile(state)} width="100%" height="100%" id={'selected-file-'} />
        <div><pre>console.log stuff panel</pre></div>
      </SplitPane>
    </SplitPane>
{whatsThisModal(state)} 
{loadProjectModal(state)} 
{saveProjectModal(state)}
  </div> 
)
}
