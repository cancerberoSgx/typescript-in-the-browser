import React from 'react';
import { Editor } from '../editor/Editor';
import { getSelectedFile } from './projectState';

export default () => {
  const f = getSelectedFile()
  if(!f){
    return (<div>No file selected</div>)
  }
  return (
    <div>
      <Editor file={f} width="100%" height="300px" id={'selected-file-'} />
    </div>
  )
}
