import React from 'react';
import { Editor } from '../editor/Editor';
import { getSelectedFile } from './projectState';

export default () => {
  const f = getSelectedFile()
    return (
      <div>
        <Editor code={f ? f.content : ''} width="100%" height="300px" id={'selected-file-'} />
      </div>
    )
}
