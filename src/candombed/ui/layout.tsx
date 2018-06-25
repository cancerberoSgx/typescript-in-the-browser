import React from 'react';
import navbar from './navbar';
import SplitPane from 'react-split-pane'

export default () => {

  return (<div className="container-fluid">
    {navbar()}

    <SplitPane
      split="vertical"
      minSize={50}
      maxSize={300}
      defaultSize={100}
      className="primary"
      pane1Style={{ background: '#eee' }}
      resizerStyle={{ background: '#000' }}
    >
      <div />
      <SplitPane split="horizontal" paneStyle={{ padding: '2em', fontStyle: 'italic' }} pane2Style={{ background: '#aaa4ba' }}>
        <div>Hello...</div>
        <div> ...world.</div>
      </SplitPane>
    </SplitPane>


  </div>)
}
